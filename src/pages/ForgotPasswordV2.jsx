import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    Input,
    Link,
    SimpleGrid,
    Text,
    useToast,
    Image,
    VStack,
  } from '@chakra-ui/react';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import * as yup from 'yup';
  import { sendResetPasswordPrompt } from '../utils/firebaseAuthUtils';
  import logo from '../Assets/Logo.png'; // Make sure you have this logo or replace it with your own
  
  const ForgotPasswordV2 = () => {
    return (
      <SimpleGrid columns={2} spacing={0} height={'100vh'}>
        <Box backgroundColor={'lightgray'}>
          <Center marginTop={20}>
            <VStack>
              <Heading marginTop="30%">Stand Up To Trash</Heading>
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
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
  
    const { register, handleSubmit, formState: { errors } } = useForm({
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
          <Heading marginTop={10}>Forgot Password?</Heading>
        </Center>
        <Center>
          <Text marginTop={5}>No worries, we’ll send you reset instructions.</Text>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
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
              width={'40%'}
            >
              Reset Password
            </Button>
          </Center>
        </form>
        <Center marginTop={5}>
          <Link
            onClick={e => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            ← Back to log in
          </Link>
        </Center>
      </Box>
    );
  };
  
  export default ForgotPasswordV2;
  