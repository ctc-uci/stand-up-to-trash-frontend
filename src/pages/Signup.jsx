import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  // useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createUserInFirebase } from '../utils/firebaseAuthUtils';
import Backend from '../utils/utils';

const Signup = () => {
  return <CreateAccount />;
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

  // const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box>
      <Center marginTop={'10%'}>
        <Heading>Sign up</Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={0}>
          <FormControl isInvalid={errors.firstName}>
            {/* <Center> */}{' '}
            <Input
              placeholder="First name"
              width={'30%'}
              marginTop={30}
              marginRight={0}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              type="text"
              {...register('firstName')}
            />
            {/* </Center> */}
            {errors.firstName && <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.lastName}>
            {/* <Center> */}
            <Input
              width={'30%'}
              marginTop={30}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              placeholder="Last name"
              type="text"
              {...register('lastName')}
            />
            {/* </Center> */}
            {errors.lastName && <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>}
          </FormControl>
        </HStack>
        <FormControl isInvalid={errors.email}>
          <Center>
            <Input
              width={'30%'}
              marginTop={30}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              placeholder={'Email address'}
              type="email"
              {...register('email')}
            />
          </Center>
          {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Center>
            <Input
              width={'30%'}
              marginTop={30}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              placeholder={'Password'}
              type="password"
              {...register('password')}
            />
          </Center>
          {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.confirmPassword}>
          <Center>
            <Input
              width={'30%'}
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
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Center>
          <Button
            type="submit"
            fontWeight={500}
            backgroundColor={'lightgray'}
            size={'lg'}
            width={'25%'}
            borderRadius={10}
            marginTop={50}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up Now
          </Button>
        </Center>
      </form>
    </Box>
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

export default Signup;
