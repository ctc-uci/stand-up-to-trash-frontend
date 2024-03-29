import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
  Image,
  VStack,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import S2T_Logo from '../Assets/S2T_Logo.png';
import ggicon from '../Assets/google.png';
import fbicon from '../Assets/fb.png';
import { logInWithEmailAndPassWord } from '../utils/firebaseAuthUtils';
import { createGoogleUserInFirebase } from '../utils/googleAuthUtils';
import { createFacebookUserInFirebase } from '../utils/facebookAuthUtils';
import { useEffect, useContext } from 'react';
import RoleContext from '../utils/RoleContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getProfileByFirebaseUid, postProfile } from '../utils/profileUtils';

const LoginV2 = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      console.log('inside useeffect');
      try {
        if (
          user &&
          (user.providerData[0].providerId == 'google.com' ||
            user.providerData[0].providerId == 'facebook.com')
        ) {
          // Keep in mind that if the user logs in with the plain email/password, they'll have no displayName attribute
          console.log(user);
          console.log('firebase inside');
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
          console.log(profile);
          console.log('success');

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
    <SimpleGrid columns={2} spacing={0} height={'100vh'} style={{ fontFamily: 'Poppins' }}>
      <Box backgroundColor="#2D558A" position="relative">
        <AbsoluteCenter>
          <Image borderRadius="full" width={357} height={430} src={S2T_Logo} alt="Logo" />
          <Box sytle={{ display: 'flex', flexDir: 'column', justifyContent: 'center' }}>
            <h1
              style={{
                color: 'white',
                fontSize: '40px',
                fontWeight: '600',
                marginTop: '52px',
                textAlign: 'center',
              }}
            >
              Stand Up To Trash
            </h1>
            <h1
              style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: '600',
                marginTop: '20px',
                textAlign: 'center',
              }}
            >
              Making a Difference
            </h1>
          </Box>
        </AbsoluteCenter>
      </Box>
      <Box marginTop={40}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Center>
            <Heading marginTop={10}>Log In</Heading>
          </Center>
          <FormControl isInvalid={errors.email}>
            {/* <FormLabel>Email address</FormLabel> */}
            <Center>
              <Input
                width={'40%'}
                marginTop={30}
                borderRadius={8}
                fontFamily={'Avenir'}
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
                width={'40%'}
                marginTop={30}
                borderRadius={8}
                fontFamily={'Avenir'}
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
                width={'80%'}
              >
                Login
              </Button>
              <Text
                marginTop={2}
                fontWeight="bold"
                style={{
                  fontFamily: 'Avenir',
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
                width={'115%'}
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
                width={'115%'}
                marginTop={3}
                border="1px solid black"
                backgroundColor={'transparent'}
                onClick={handleFacebookLogin}
              >
                Login with Facebook
              </Button>

              <Box
                style={{
                  fontFamily: 'Avenir',
                  fontSize: '18px',
                  fontWeight: '800',
                  textAlign: 'center',
                }}
              >
                <Button
                  style={{
                    background: 'none',
                    height: '24px',
                    fontFamily: 'Avenir',
                    fontSize: '18px',
                    fontWeight: '800',
                    textAlign: 'center',
                    paddingTop: '15px',
                  }}
                  onClick={() => navigate('/forgotpasswordv2')}
                >
                  Forgot Password?
                </Button>
                {/* <Text paddingTop='15px'>Forgot Password?</Text> */}
                <Box display="flex" flexDir="row" paddingTop="20px">
                  <Text lineHeight="24px">Don’t have an account?</Text>

                  <Button
                    style={{
                      background: 'none',
                      height: '24px',
                      color: '#478CB6',
                      fontFamily: 'Avenir',
                      fontSize: '18px',
                      fontWeight: '800',
                      textAlign: 'center',
                      marginLeft: '-5px',
                    }}
                    onClick={() => navigate('/signupv2')}
                  >
                    <u>Sign up</u>
                  </Button>
                </Box>
              </Box>
            </VStack>
          </Center>
        </form>
      </Box>
    </SimpleGrid>
  );
};

export default LoginV2;
