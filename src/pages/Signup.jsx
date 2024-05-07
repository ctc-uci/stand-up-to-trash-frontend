import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
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

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async event => {
    const { firstName, lastName, email, password } = event;
    const role = 'volunteer';

    try {
      const newUser = await createUserInFirebase(email, password, '/successful-login', navigate);
      await createVolunteerRow({
        firstName,
        lastName,
        role,
        email,
        password,
        firebase_uid: newUser.uid,
      });

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
        <HStack spacing={4} justifyContent={'center'}>
          <FormControl isInvalid={errors.firstName}>
            <Input
              placeholder="First name"
              width={'30%'}
              marginTop={30}
              marginLeft={'70%'}
              size={'lg'}
              borderRadius={8}
              boxShadow={'0 4px 2px -2px gray'}
              type="text"
              {...register('firstName')}
            />
            {errors.firstName && <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.lastName}>
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
          {errors.email && (
            <Center>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </Center>
          )}
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
          {errors.password && (
            <Center>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </Center>
          )}
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
            <Center>
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </Center>
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
            marginTop={'20'}
            boxShadow={'0 4px 2px -2px gray'}
            // onClick={handleSubmit(onSubmit)}
          >
            Sign Up Now
          </Button>
        </Center>
      </form>
    </Box>
  );
};

const createVolunteerRow = async ({ firstName, lastName, role, email, firebase_uid }) => {
  const response = await Backend.post('/profiles', {
    first_name: firstName,
    last_name: lastName,
    role: role,
    email: email,
    firebase_uid: firebase_uid,
  });
  return response;
};

export default Signup;
