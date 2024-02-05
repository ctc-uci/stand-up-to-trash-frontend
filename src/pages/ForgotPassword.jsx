import {
  Box,
  Button,
  Center,
  Link,
  FormControl,
  Text,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  return (
    <Box>
      <Center marginTop={'10%'}>
        <Heading>Forgot Password?</Heading>
      </Center>
      <Center marginTop={7}>
        <Text>No worries, we’ll send you reset instructions.</Text>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Center>
            <Input
              placeholder="Email"
              width={'25%'}
              marginTop={30}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </Center>
        </FormControl>
      </form>

      <Center>
        <Button
          fontWeight={500}
          backgroundColor={'lightgray'}
          size={'lg'}
          width={'15%'}
          borderRadius={10}
          marginTop={10}
          boxShadow={'0 4px 2px -2px gray'}
          mr={3}
          type="submit"
          onClick={onSubmit}
        >
          Reset Password
        </Button>
      </Center>
      <Center marginTop={5}>
        <Link
          onClick={e => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          ← Back to log in{' '}
        </Link>
      </Center>
    </Box>
  );
};

export default ForgotPassword;
