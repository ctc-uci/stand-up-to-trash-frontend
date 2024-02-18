import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Center,
    Image,
    useToast,
    Flex,
    IconButton,
    Select,
    Box,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

import Backend from '../../utils/utils'; // Ensure the Backend utility supports POST for adding a user

const AddUserModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Update the local state with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const postUserData = async (formData) => {
    // Add the role 'admin' to the formData before sending
    const updatedFormData = {
      ...formData,
      profile_image: selectedImage, // Ensure the profile image is included
      role: 'admin', // Assuming all added users are admins
    };

    try {
      const endpoint = `/profiles`; // Adjusted endpoint for adding a user
      const response = await Backend.post(endpoint, updatedFormData);

      if (response.status !== 200) {
        throw new Error('Failed to add user');
      }

      toast({
        title: "User added successfully.",
        description: "The new user has been added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error adding user.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    postUserData(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent sx={{ borderRadius: '22px' }}>
        <ModalHeader align="center" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Add New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Center position="relative" mt={4} width="470px" height="140px" sx={{ overflow: 'hidden', margin: 'auto' }}>
                <Image
                    src={selectedImage}
                    borderRadius="22px"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    sx={{ filter: 'blur(4px)' }}
                />
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="blackAlpha.600" 
                    borderRadius="22px"
                />
                <IconButton
                    aria-label="Upload image"
                    icon={<FiUpload />}
                    variant="solid"
                    size="xl"
                    boxSize="65px" 
                    position="absolute"
                    left="50%" 
                    top="50%" 
                    transform="translate(-50%, -50%)" 
                    backgroundColor="white" 
                    borderRadius="full"
                    color="black" 
                    _hover={{
                    bg: 'white', 
                    transform: 'translate(-50%, -50%) scale(1.1)', 
                    }}
                    onClick={() => document.getElementById('file-upload').click()}
                />
                <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </Center>

            <Flex justify="space-between" mt={4}>
              <FormControl pr={2} w="50%">
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>First Name</FormLabel>
                <Input {...register('first_name')} />
              </FormControl>
              <FormControl pl={2} w="50%">
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Last Name</FormLabel>
                <Input {...register('last_name')} />
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Email</FormLabel>
              <Input {...register('email')} type="email" />
            </FormControl>
            {/* Role is not editable and set to admin by default */}
            <FormControl mt={4}>
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Add Role</FormLabel>
                <Input value="admin" disabled={true} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Account Type</FormLabel>
              <Select {...register('account_type')}>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            <Center p={8} gap={4} width="full" justifyContent="center">
                <Button
                    type="submit"
                    sx={{
                    width: "full", 
                    borderRadius: "15px", 
                    backgroundColor: '#95D497',
                    color: 'black',
                    fontWeight: 'bold',
                    _hover: {
                        bg: 'green.200',
                    },
                    }}
                    isLoading={isSubmitting}
                >
                    Send Email
                </Button>
            </Center>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
