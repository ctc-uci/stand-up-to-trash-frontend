import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { logInWithEmailAndPassWord } from '../utils/firebaseAuthUtils';

const Login = () => {
  return <LoginForm />;
};

// :D

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
        <Center>
          <Heading marginTop={'30%'} fontWeight={400}>
            Stand Up to Trash
          </Heading>
        </Center>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Center marginTop={'30%'}>
            <Heading>Log In</Heading>
          </Center>
          <FormControl isInvalid={errors.email}>
            {/* <FormLabel>Email address</FormLabel> */}
            <Center>
              <Input
                width={'60%'}
                marginTop={30}
                borderRadius={8}
                boxShadow={'0 4px 2px -2px gray'}
                placeholder="Email"
                size={'lg'}
                type="email"
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
                width={'60%'}
                marginTop={30}
                size={'lg'}
                borderRadius={8}
                boxShadow={'0 4px 2px -2px gray'}
                placeholder="Password"
                type="password"
                {...register('password')}
                isRequired
              />
            </Center>
            {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
          </FormControl>
          <Center>
            <Button
              type="submit"
              // fontFamily={"Optima"}
              fontWeight={500}
              backgroundColor={'lightgray'}
              size={'lg'}
              width={'25%'}
              borderRadius={10}
              marginTop={50}
            >
              Login Now
            </Button>
          </Center>
        </form>
      </Box>
    </SimpleGrid>
  );
};

export default Login;
