import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormControl,
    FormLabel,
    Input,
    ChakraProvider,
    useToast,
    Text,
    Box,
    CloseButton
  } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { updateProfile } from '../../utils/profileUtils.js';
import React from 'react';

const EditFirstNameModal = ({ isOpen, onClose, user }) => {
    const [updatedName, setName] = useState(user.first_name);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change name in database here
        user.first_name = updatedName;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'First Name Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setName(user.first_name);
    };

    const isSubmittable = updatedName === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={{base: '80%', md: '25%', lg: '25%'}}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit First Name
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    First Name
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.first_name}
                    onChange={e => {
                    setName(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

const EditLastNameModal = ({ isOpen, onClose, user }) => {
    const [updatedName, setName] = useState(user.last_name);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change name in database here
        user.last_name = updatedName;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'Last Name Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setName(user.last_name);
    };

    const isSubmittable = updatedName === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={{base: '80%', md: '25%', lg: '25%'}}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit Last Name
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    Last Name
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.last_name}
                    onChange={e => {
                    setName(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

const EditEmailModal = ({ isOpen, onClose, user }) => {
    const [updatedEmail, setEmail] = useState(user.email);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change email in database here
        user.email = updatedEmail;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'Email Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setEmail(user.email);
    };

    const isSubmittable = updatedEmail === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={{base: '80%', md: '25%', lg: '25%'}}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit Email
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    Email
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.email}
                    onChange={e => {
                    setEmail(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

const EditOrganizationModal = ({ isOpen, onClose, user }) => {
    const [updatedOrganization, setOrganization] = useState(user.organization);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change organization in database here
        user.organization = updatedOrganization;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'Organization Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setOrganization(user.organization);
    };

    const isSubmittable = updatedOrganization === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={'25%'}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit Organization
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    Organization
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.organization}
                    onChange={e => {
                    setOrganization(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

const EditPhoneNumberModal = ({ isOpen, onClose, user }) => {
    const [updatedPhoneNumber, setPhoneNumber] = useState(user.phone_number);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change phone number in database here
        user.phone_number = updatedPhoneNumber;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'Phone Number Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setPhoneNumber(user.phone_number);
    };

    const isSubmittable = updatedPhoneNumber === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={{base: '80%', md: '25%', lg: '25%'}}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit Phone Number
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    Phone Number
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.phone_number}
                    onChange={e => {
                    setPhoneNumber(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

const EditAboutMeModal = ({ isOpen, onClose, user }) => {
    const [updatedAboutMe, setAboutMe] = useState(user.about_me);

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async () => {
        try {
        toastIdRef.current = toast({
            title: 'Saving Changes.',
            description: 'Loading...',
            status: 'loading',
            position: 'bottom-right',
            isClosable: true,
        });
        // change about me in database here
        user.about_me = updatedAboutMe;
        user.imageUrl = user.image_url;
        let response = await updateProfile(user.id, user);
        toast.close(toastIdRef.current);
        if (response.name == "error") {
            throw console.error();
        }
        toast({
            title: 'Changes Saved.',
            description: 'About Me Updated.',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        onClose();
        } catch (err) {
        console.log(err);
        toast({
            title: 'Something Went Wrong.',
            description: 'Changes Were Not Saved.',
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        });
        }
    };

    const handleCancel = () => {
        onClose();
        setAboutMe(user.about_me);
    };

    const isSubmittable = updatedAboutMe === "";

    return (
        <ChakraProvider>
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent
            minW={'25%'}
            maxW={'30%'}
            borderRadius={'12px'}
            boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
            background={'#FFFFFF'}
            >
            <ModalHeader>
                <Box display="flex" alignContent={"space-between"} justifyContent={"space-between"}>
                    <Text
                        fontSize={'23px'}
                        justify={'center'}
                        align={'center'}
                        marginLeft={'33px'}
                        // Push over by the size of the button
                        width={'100%'}
                        fontWeight={'800'}
                        fontFamily={'Avenir'}
                        letterSpacing={'0em'}
                    >
                    Edit About Me Section
                    </Text>
                    <CloseButton
                        marginTop={'-8px'}
                        marginRight={'-12px'}
                        padding={'0 0 0 0'}
                        minWidth={'33px'}
                        width={'33px'}
                        height={'33px'}
                        backgroundColor={'#EFEFEF'}
                        borderRadius={'100%'}
                        onClick={handleCancel}
                        size={'sm'}
                        color={'#717171'}
                        _hover={{ 
                            bg: '#dbdbdb',
                        }} 
                        />
                </Box>
                
            </ModalHeader>

            <ModalBody>
                <FormControl>
                <FormLabel paddingTop={'10px'} fontWeight={'500'} fontSize={'16px'} marginLeft={'13px'}
                        fontFamily={'Avenir'} lineHeight={'15px'} letterSpacing={'0em'} justify={'left'}
                        align={'left'}
                >
                    About Me
                </FormLabel>
                <Input
                    fontFamily={'Inter, Arial, Helvetica, sans-serif'}
                    fontSize={'16px'}
                    fontWeight={'500'}
                    letterSpacing={'0em'}
                    background={'#FFFFFF'}
                    border={'1px solid #E2E8F0'}
                    boxShadow={'0px 4px 4px 0px #00000040'}
                    type="text"
                    placeholder={user.about_me}
                    onChange={e => {
                    setAboutMe(e.target.value)
                    }}
                />
                
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'} marginBottom={'20px'}>
                <Button
                onClick={handleCancel}
                width={'23%'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'8px'}
                marginRight={'10px'}
                border={'2px solid #0075FF'}
                color={'#0075FF'}
                gap={'6px'}
                padding={'12 11.321188926696777 12 11.321188926696777'}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'red',
                    border: '2px solid red',
                    color: '#FFFFFF'
                }} 
                >
                Cancel
                </Button>
                <Button
                width={'23%'}
                backgroundColor={'#0075FF'}
                borderRadius={'8px'}
                marginLeft={'10px'}
                padding={'12 16 12 16'}
                gap={'6px'}
                color={'#FFFFFF'}
                onClick={handleSubmit}
                isDisabled={isSubmittable}
                fontFamily={'Avenir'}
                fontSize={'14px'}
                _hover={{ 
                    bg: 'green',
                    color: '#FFFFFF'
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </ChakraProvider>
    );
};

EditFirstNameModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

EditLastNameModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

EditEmailModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

EditOrganizationModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

EditPhoneNumberModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

EditAboutMeModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

export {EditFirstNameModal, EditLastNameModal, EditAboutMeModal, EditEmailModal, EditOrganizationModal, EditPhoneNumberModal};
