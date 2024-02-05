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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../Assets/Logo.png';
import ggicon from '../Assets/google.png';
import fbicon from '../Assets/fb.png';
import { logInWithEmailAndPassWord } from '../utils/firebaseAuthUtils';

const LoginV2 = () => {
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
      await logInWithEmailAndPassWord(event.email, event.password, '/successful-login', navigate);
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

  return (
    <SimpleGrid columns={2} spacing={0} height={'100vh'}>
      <Box backgroundColor={'lightgray'}>
        <Center marginTop={20}>
          <VStack>
            <Heading marginTop="30%">Stand Up to Trash</Heading>
            <Image marginTop="10%" borderRadius="full" boxSize="300px" src={logo} alt="Logo" />
          </VStack>
        </Center>
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
              <Text marginTop={5} fontWeight="bold">
                Other ways to login
              </Text>
              <Button
                leftIcon={<Image src={ggicon} alt="Google Icon" />}
                size="md"
                width="140%"
                marginTop={5}
                border="1px solid black"
              >
                Login with Google
              </Button>
              <Button
                leftIcon={<Image src={fbicon} alt="Facebook Icon" />}
                size="md"
                width="140%"
                marginTop={3}
                border="1px solid black"
              >
                Login with Facebook
              </Button>
            </VStack>
          </Center>
        </form>
      </Box>
    </SimpleGrid>
  );
};

export default LoginV2;