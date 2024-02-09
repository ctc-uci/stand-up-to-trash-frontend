import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../Assets/Logo.png'; // Ensure you have this asset
import { createUserInFirebase } from '../utils/firebaseAuthUtils';
import Backend from '../utils/utils';

const SignupV2 = () => {
  return (
    <>
      <CreateAccount />
    </>
  );
};

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

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    delayError: 750,
  });

  const createVolunteerRow = async ({ id, email, firstName, lastName }) => {
    const response = await Backend.post('/profiles', {
      id: id,
      email: email,
      first_name: firstName,
      last_name: lastName,
    });
    return response;
  };

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async event => {
    const { email, password, firstName, lastName } = event;

    try {
      const newUser = await createUserInFirebase(email, password, '/successful-login', navigate);
      await createVolunteerRow({ id: newUser.uid, email, firstName, lastName });

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
    <SimpleGrid columns={2} spacing={0} height={'100vh'}>
      <Box backgroundColor={'lightgray'}>
        <Center marginTop={20}>
          <VStack>
            <Heading marginTop="30%">Stand Up To Trash</Heading>
            <Box
              marginTop="10%"
              borderRadius="full"
              boxSize="300px"
              backgroundImage={`url(${logo})`}
              backgroundPosition="center"
              backgroundSize="cover"
              alt="Community Logo"
            />
          </VStack>
        </Center>
      </Box>
      <Box marginTop={40}>
        <Center>
          <VStack spacing={4} padding={10}>
            <Heading>Sign Up</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack spacing={4} justifyContent={'center'}>
                <FormControl isInvalid={errors.firstName}>
                  <Input
                    placeholder="First name"
                    width={'100%'}
                    marginTop={30}
                    marginRight={'70%'}
                    size={'lg'}
                    borderRadius={8}
                    boxShadow={'0 4px 2px -2px gray'}
                    type="text"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.lastName}>
                  <Input
                    width={'100%'}
                    marginTop={30}
                    size={'lg'}
                    borderRadius={8}
                    boxShadow={'0 4px 2px -2px gray'}
                    placeholder="Last name"
                    type="text"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <FormControl isInvalid={errors.email}>
                <Center>
                  <Input
                    marginTop={30}
                    size={'lg'}
                    borderRadius={8}
                    boxShadow={'0 4px 2px -2px gray'}
                    placeholder={'Email address'}
                    type="email"
                    {...register('email')}
                  />
                </Center>
                {errors.email && (
                  <Center>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </Center>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <Center>
                  <Input
                    marginTop={30}
                    size={'lg'}
                    borderRadius={8}
                    boxShadow={'0 4px 2px -2px gray'}
                    placeholder={'Password'}
                    type="password"
                    {...register('password')}
                  />
                </Center>
                {errors.password && (
                  <Center>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  </Center>
                )}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <Center>
                  <Input
                    marginTop={30}
                    size={'lg'}
                    borderRadius={8}
                    boxShadow={'0 4px 2px -2px gray'}
                    placeholder={'Confirm Password'}
                    type="password"
                    {...register('confirmPassword')}
                  />
                </Center>
                {errors.confirmPassword && (
                  <Center>
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                  </Center>
                )}
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  fontWeight={500}
                  size={'lg'}
                  borderRadius={10}
                  marginTop={'5'}
                  boxShadow={'0 4px 2px -2px gray'}
                  onClick={handleSubmit(onSubmit)}
                  backgroundColor={'#3182CE'}
                  textColor={'white'}
                >
                  Sign Up Now
                </Button>
              </Center>
            </form>
          </VStack>
        </Center>
      </Box>
    </SimpleGrid>
  );
};

export default SignupV2;
