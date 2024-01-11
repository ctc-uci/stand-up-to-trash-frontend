import {
    Button,
    FormControl, FormLabel, FormErrorMessage, Input,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserInFirebase, logInWithEmailAndPassWord, sendResetPasswordPrompt } from '../../utils/firebaseAuthUtils';
  
const Login = () => {
    return (
        <>
            <LoginForm/>
            <CreateAccount />
            <ForgotPasswordButton />
        </>
    );
}

// :D

const accountSchema = yup.object({
    email: yup.string().email().required("Please enter your email address"),
    password: yup.string().required("Please enter your password"),
});

const resetSchema = yup.object({
    email: yup.string().email().required("Please enter your email address"),
});

const LoginForm = () => {
    // Form authentication code roughly reproduced from:
    // github.com/ctc-uci/patriots-and-paws-frontend/blob/dev/src/components/Login/Login.jsx
    
    const navigate = useNavigate();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(accountSchema),
        delayError: 750,
    })

    const handleLogin = async (event) => {
        try {
            await logInWithEmailAndPassWord(event.email, event.password, "/successful-login", navigate)
        } catch (err) {
            const errorCode = err.code;
            const firebaseErrorMsg = err.message;
            
            const showSigninError = (msg) => toast({title: "An error occurred while signing in", description: msg, status: "error", variant: "subtle"});

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
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} isRequired />
                {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} isRequired />
                {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </FormControl>
            <Button type="submit">Login</Button>
        </form>
    );
}

const CreateAccount = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(accountSchema),
        delayError: 750,
      });
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        const { email, password } = event;
                  
        try {
            await createUserInFirebase(email, password, "/successful-login", navigate);

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
            
            console.error(e)
        }
        
    }

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
                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" {...register("email")} />
                            {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" {...register("password")} />
                            {errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} type="submit" onClick={handleSubmit(onSubmit)}>
                        Create Account
                    </Button>
                    <Button variant='outline' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    )
}

const ForgotPasswordButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState("");
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
                description: "Check your email for instructions on how to reset your password",
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
            
            console.error(err)
        }
      }

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
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit" onClick={onSubmit}>
                            Reset Account
                        </Button>
                        <Button variant='outline' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default Login;
