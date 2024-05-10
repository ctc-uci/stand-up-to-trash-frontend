import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  useToast,
  Image,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ggicon from '../Assets/google.png';
import fbicon from '../Assets/fb.png';
import { logInWithEmailAndPassWord } from '../utils/firebaseAuthUtils';
import { createGoogleUserInFirebase } from '../utils/googleAuthUtils';
import { createFacebookUserInFirebase } from '../utils/facebookAuthUtils';
import { useEffect, useContext } from 'react';
import RoleContext from '../utils/RoleContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getProfileByFirebaseUid, postProfile } from '../utils/profileUtils';
import AuthPage from '../components/Auth/AuthPage';

const LoginV2 = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (
          user &&
          (user.providerData[0].providerId == 'google.com' ||
            user.providerData[0].providerId == 'facebook.com')
        ) {
          // Keep in mind that if the user logs in with the plain email/password, they'll have no displayName attribute

          const userName = user.displayName.split(' ');
          const firstName = userName[0];
          const lastName = userName.length > 1 ? userName[1] : '';

          const profile = {
            first_name: firstName,
            last_name: lastName,
            role: 'volunteer',
            email: user.email,
            firebase_uid: user.uid,
          };

          await setRole('volunteer');

          if (!(await getProfileByFirebaseUid(profile.firebase_uid))) {
            postProfile(profile);
          }
          navigate('/');
        } else {
          console.log('No one in');
        }
      } catch (error) {
        console.log(error, error.status);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, setRole]);

  return <LoginForm />;
};

const signinSchema = yup.object({
  email: yup.string().email().required('Please enter your email address'),
  password: yup.string().required('Please enter your password'),
});

const LoginForm = () => {
  // Form authentication code roughly reproduced from:
  // github.com/ctc-uci/patriots-and-paws-frontend/blob/dev/src/components/Login/Login.jsx

  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
    delayError: 750,
  });

  const handleLogin = async event => {
    try {
      await logInWithEmailAndPassWord(event.email, event.password, '/', navigate);
    } catch (err) {
      const errorCode = err.code;
      const firebaseErrorMsg = err.message;

      const showSigninError = msg =>
        toast({
          title: 'An error occurred while signing in',
          description: msg,
          status: 'error',
          variant: 'subtle',
        });

      if (errorCode === 'auth/wrong-password') {
        showSigninError('Email address or password does not match our records!');
      } else if (errorCode === 'auth/invalid-credential') {
        showSigninError('Email address or password does not match our records!');
      } else if (errorCode === 'auth/invalid-email') {
        showSigninError('Email address or password does not match our records!');
      } else if (errorCode === 'auth/unverified-email') {
        showSigninError('Please verify your email address.');
      } else if (errorCode === 'auth/user-not-found') {
        showSigninError('Email address or password does not match our records!');
      } else if (errorCode === 'auth/user-disabled') {
        showSigninError('This account has been disabled.');
      } else if (errorCode === 'auth/too-many-requests') {
        showSigninError('Too many attempts. Please try again later.');
      } else if (errorCode === 'auth/user-signed-out') {
        showSigninError('You have been signed out. Please sign in again.');
      } else {
        showSigninError(firebaseErrorMsg);
      }
    }
  };

  const handleGoogleLogin = () => {
    createGoogleUserInFirebase('/loginv2', navigate);
  };

  const handleFacebookLogin = () => {
    createFacebookUserInFirebase('/loginv2', navigate);
  };

  return (
    <AuthPage>
      <Box style={{ width: '100%' }} height={'fit-content'} mt={'auto'} mb="auto">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Center>
            <Heading marginTop={10}>Log In</Heading>
          </Center>
          <FormControl isInvalid={errors.email} w={'100%'} d="block">
            {/* <FormLabel>Email address</FormLabel> */}
            <Center>
              <Input
                maxW={'20rem'}
                marginTop={30}
                borderRadius={8}
                placeholder="Email"
                boxShadow={'0 4px 2px -2px gray'}
                type="email"
                size={'lg'}
                {...register('email')}
                isRequired
              />
            </Center>
            {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.password}>
            {/* <FormLabel>Password</FormLabel> */}
            <Center>
              <Input
                maxW={'20rem'}
                marginTop={30}
                borderRadius={8}
                placeholder="Password"
                type="password"
                boxShadow={'0 4px 2px -2px gray'}
                size={'lg'}
                {...register('password')}
                isRequired
              />
            </Center>
            {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
          </FormControl>
          <Center>
            <VStack>
              <Button
                type="submit"
                marginTop={4}
                fontWeight={500}
                backgroundColor={'#3182CE'}
                textColor={'white'}
                size={'lg'}
                borderRadius={'10'}
                w={'100%'}
                maxW={'16rem'}
              >
                Login
              </Button>
              <Text
                marginTop={2}
                fontWeight="bold"
                style={{
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                Other ways to login
              </Text>
              <Button
                leftIcon={<Image src={ggicon} alt="Google Icon" />}
                size="md"
                // width={'36.82vh'}
                width={'100%'}
                maxW={'20rem'}
                marginTop={2}
                border="1px solid black"
                backgroundColor={'transparent'}
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
              <Button
                leftIcon={<Image src={fbicon} alt="Facebook Icon" />}
                size="md"
                // width={'36.82vh'}
                width={'100%'}
                maxW={'20rem'}
                marginTop={3}
                border="1px solid black"
                backgroundColor={'transparent'}
                onClick={handleFacebookLogin}
              >
                Login with Facebook
              </Button>

              <Box
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  textAlign: 'center',
                }}
              >
                <Button
                  style={{
                    background: 'none',
                    height: '24px',
                    fontSize: '18px',
                    fontWeight: '800',
                    textAlign: 'center',
                    paddingTop: '15px',
                  }}
                  color={'#478CB6'}
                  textDecoration={'underline'}
                  onClick={() => navigate('/forgotpasswordv2')}
                >
                  Forgot Password?
                </Button>
                {/* <Text paddingTop='15px'>Forgot Password?</Text> */}
                <Box display="flex" flexDir="row" paddingTop="20px">
                  <Text lineHeight="24px">
                    Don{`'`}t have an account?{' '}
                    <Button
                      style={{
                        background: 'none',
                        height: '24px',
                        color: '#478CB6',
                        fontSize: '18px',
                        fontWeight: '800',
                        textAlign: 'center',
                        marginLeft: '-5px',
                      }}
                      onClick={() => navigate('/signupv2')}
                    >
                      <u>Sign up</u>
                    </Button>
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Center>
        </form>
      </Box>
    </AuthPage>
  );
};

export default LoginV2;
