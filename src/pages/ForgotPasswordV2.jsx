import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';
import { sendResetPasswordPrompt } from '../utils/firebaseAuthUtils';
// import logo from '../Assets/Logo.png'; // Make sure you have this logo or replace it with your own
import S2T_Logo from '../Assets/S2T_Logo.png';

const ForgotPasswordV2 = () => {
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
        <ForgotPasswordForm />
      </Box>
    </SimpleGrid>
  );
};

const resetSchema = yup.object({
  email: yup.string().email().required('Please enter your email address'),
});

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
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
      <Center>
        <Heading marginTop={10} fontFamily={'Poppins'} fontSize={32}>
          Forgot Password?
        </Heading>
      </Center>
      <Center>
        <Text marginTop={5} fontSize={18}>
          No worries, we’ll send you reset instructions.
        </Text>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <Center>
            <Input
              width={'40%'}
              marginTop={30}
              borderRadius={8}
              placeholder="Email"
              fontFamily={'Avenir'}
              boxShadow={'0 4px 2px -2px gray'}
              type="email"
              size={'lg'}
              {...register('email')}
              onChange={e => setEmail(e.target.value)}
              isRequired
            />
          </Center>
        </FormControl>
        <Center>
          <Button
            type="submit"
            marginTop={4}
            fontWeight={500}
            backgroundColor={'#3182CE'}
            textColor={'white'}
            size={'lg'}
            borderRadius={'10'}
            width={'22%'}
          >
            Reset Password
          </Button>
        </Center>
      </form>
      <Center marginTop={5}>
        <Link
          onClick={e => {
            e.preventDefault();
            navigate('/loginv2');
          }}
        >
          ← Back to log in
        </Link>
      </Center>
    </Box>
  );
};

export default ForgotPasswordV2;
