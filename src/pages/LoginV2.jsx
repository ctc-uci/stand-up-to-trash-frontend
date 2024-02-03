import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  Image,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../Assets/Logo.png';
import ggicon from '../Assets/google.png'
import fbicon from '../Assets/fb.png'
import {
  createUserInFirebase,
  logInWithEmailAndPassWord,
  sendResetPasswordPrompt,
} from '../utils/firebaseAuthUtils';
import Backend from '../utils/utils';

const LoginV2 = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

// :D

const signinSchema = yup.object({
  email: yup.string().email().required('Please enter your email address'),
  password: yup.string().required('Please enter your password'),
});

const signupSchema = yup.object({
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  email: yup.string().email().required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password requires at least 8 characters consisting of at least 1 lowercase letter, 1 uppercase letter, 1 symbol, and 1 number',
    ),
  confirmPassword: yup
    .string()
    .required('Please re-enter your password')
    .oneOf([yup.ref('password'), null], "Passwords don't match"),
});

const resetSchema = yup.object({
  email: yup.string().email().required('Please enter your email address'),
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
          <VStack>
            <Heading marginTop="30%">Stand Up to Trash</Heading>
            <Image
              marginTop="10%"
              borderRadius="full"
              boxSize="300px"
              src={logo}
              alt="Logo"
            />
          </VStack>
        </Center>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Center>
            <Heading>Log In</Heading>
          </Center>
          <FormControl isInvalid={errors.email}>
            {/* <FormLabel>Email address</FormLabel> */}
            <Center>
              <Input
                width={'60%'}
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
                width={'60%'}
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
              <Button type="submit" marginTop={10} fontWeight={500} backgroundColor={'#3182CE'} textColor={'white'} size={'lg'} borderRadius={'10'}>
                Login Now
              </Button>
              <Text marginTop={5} fontWeight={500}>Other ways to login</Text>
              <Button
                leftIcon={<Image src={ggicon} alt="Google Icon"/>}
                size="md"
                width="140%"
                marginTop={5}
                border='1px solid black'
              >
                Login with Google
              </Button>
              <Button
                leftIcon={<Image src={fbicon} alt="Facebook Icon" />}
                size="md"
                width="140%"
                marginTop={3}
                border='1px solid black'
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

// login version2

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    delayError: 750,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async event => {
    const { email, password, firstName, lastName } = event;

    try {
      await createUserInFirebase(email, password, '/successful-login', navigate);
      await createVolunteerRow({ id: email, email, firstName, lastName });

      toast.closeAll();

      toast({
        title: 'Account Successfully Created',
        status: 'success',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      const errorCode = e.code;
      const firebaseErrorMsg = e.message;

      toast({
        title: 'An Error Occurred...',
        description: `${errorCode}: ${firebaseErrorMsg}`,
        status: 'error',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      });

      console.error(e);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack>
                <FormControl isInvalid={errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register('firstName')} />
                  {errors.firstName && (
                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" {...register('lastName')} />
                  {errors.lastName && (
                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && (
                  <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit(onSubmit)}>
              Create Account
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const createVolunteerRow = async ({ id, email, firstName, lastName }) => {
  const response = await Backend.post('/profiles', {
    id: id,
    email: email,
    first_name: firstName,
    last_name: lastName,
  });
  return response;
};

const ForgotPasswordButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const toast = useToast();

  const { handleSubmit } = useForm({
    resolver: yupResolver(resetSchema),
    delayError: 750,
  });

  const onSubmit = async () => {
    try {
      await sendResetPasswordPrompt(email);

      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for instructions on how to reset your password',
        status: 'success',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      const errorCode = err.code;
      const firebaseErrorMsg = err.message;

      toast({
        title: 'An Error Occurred...',
        description: `${errorCode}: ${firebaseErrorMsg}`,
        status: 'error',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      });

      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Forgot Password?</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" onClick={onSubmit}>
              Reset Account
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginV2;
