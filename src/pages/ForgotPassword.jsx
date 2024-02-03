import {
  Box,
  Button,
  // Center,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  // Heading,
  // HStack,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { sendResetPasswordPrompt } from '../utils/firebaseAuthUtils';

const ForgotPassword = () => {
  return <ForgotPasswordButton />;
};

const resetSchema = yup.object({
  email: yup.string().email().required('Please enter your email address'),
});

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
    <Box>
      <Button onClick={onOpen}>Forgot Password?</Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </FormControl>
      </form>

      <Button colorScheme="blue" mr={3} type="submit" onClick={onSubmit}>
        Reset Account
      </Button>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default ForgotPassword;
