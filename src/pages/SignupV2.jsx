import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Image,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useContext } from 'react';
import RoleContext from '../utils/RoleContext';
// import logo from '../Assets/Logo.png'; // Ensure you have this asset
import S2T_Logo from '../Assets/S2T_Logo.png';
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

  const createVolunteerRow = async ({ firstName, lastName, role, email, firebase_uid }) => {
    const response = await Backend.post('/profiles', {
      first_name: firstName,
      last_name: lastName,
      role: role,
      email: email,
      firebase_uid: firebase_uid,
    });
    // console.log(response);
    return response;
  };

  const toast = useToast();
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const onSubmit = async event => {
    const { firstName, lastName, email, password } = event;
    const role = 'volunteer';

    try {
      const newUser = await createUserInFirebase(email, password, '/playground', navigate); // Flag: Update to new volunteer page route
      // add role, firebase_uid
      await createVolunteerRow({
        firstName,
        lastName,
        role,
        email,
        password,
        firebase_uid: newUser.uid,
      });

      await setRole(role);

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
        <Center>
          <VStack spacing={4} padding={10} width={'48vh'}>
            <Heading>Sign Up</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack spacing={4} justifyContent={'center'}>
                <FormControl isInvalid={errors.firstName}>
                  <Input
                    placeholder="First name"
                    width={'100%'}
                    marginTop={30}
                    marginRight={'70%'}
                    fontFamily={'Avenir'}
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
                    fontFamily={'Avenir'}
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
                    fontFamily={'Avenir'}
                    boxShadow={'0 4px 2px -2px gray'}
                    placeholder={'Email'}
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
                    fontFamily={'Avenir'}
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
                    fontFamily={'Avenir'}
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
                  width={'20vh'}
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
