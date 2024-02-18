import { useState, useEffect } from 'react';
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
    Select,
    Center,
    Image,
    useToast,
    Flex,
    IconButton,
    Box,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi'; // Import an upload icon from react-icons

import Backend from '../../utils/utils'; // Ensure this utility is correctly implemented for API calls

const EditUserModal = ({
  isOpen,
  onClose,
  profileImage,
  firstName,
  lastName,
  email,
  userId,
}) => {
  const [selectedImage, setSelectedImage] = useState(profileImage);
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

  const { register, handleSubmit, setValue, formState: { isSubmitting }} = useForm({
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      profile_image: profileImage,
    },
  });

  useEffect(() => {
    register('profile_image');
  }, [register]);

  useEffect(() => {
    setValue('profile_image', selectedImage);
  }, [selectedImage, setValue]);

  // const editUserData = async (formData) => {
  
  // }


  const postUserData = async (formData) => {
    // Add the role 'admin' to the formData before sending
    const updatedFormData = {
      ...formData,
      role: 'admin', // Hardcoding the role as 'admin'
    };
  
    try {
      const endpoint = `/profiles`;
      const response = await Backend.post(endpoint, updatedFormData);
  
      // Log the response for debugging
      console.log('Response Status:', response.status);
      console.log('Response Body:', response.statusText);
  
      // Check if the response status code is in the 2xx range
      if (!response.ok) {
        throw new Error(`Failed to add new user. Status code: ${response.status}`);
      }
  
      toast({
        title: "User added successfully.",
        description: "A new user has been added to the database.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      // Optionally, refresh the list of users in the parent component
    } catch (error) {
      console.error('Error adding new user:', error);
      toast({
        title: "Error adding new user.",
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

  const removeUser = async () => {
    try {
      const endpoint = `/profiles/${userId}`;
      const response = await Backend.delete(endpoint); // Replace with your actual API call logic

      if (response.status !== 200) {
        throw new Error('Failed to delete user');
      }

      toast({
        title: "User removed successfully.",
        description: "The user has been removed from the database.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose(); // Close the modal after successful deletion
      // Optionally, refresh the list of users in the parent component

    } catch (error) {
      console.error('Error removing user:', error);
      toast({
        title: "Error removing user.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent sx={{
      borderRadius: '22px', 
      }}>
        <ModalHeader align="center" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Edit Admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Center position="relative" mt={4} width="470px" height="140px" sx={{ overflow: 'hidden', margin: 'auto' }}>
                <Image
                    src={selectedImage || profileImage}
                    borderRadius="22px"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    sx={{
                    filter: 'blur(4px)', 
                    }}
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
                <Flex gap={4} width="full" justifyContent="space-between">
                    <Button
                        colorScheme="red"
                        variant="outline"
                        borderColor="red.500"
                        color="red.500"
                        sx={{
                        width: "452px", // Width as per requirement
                        height: "37px", // Height as per requirement
                        borderRadius: "15px", // Border radius as per requirement
                        borderWidth: "4px", // Thick border as per the image
                        fontWeight: "bold",
                        fontFamily: 'Poppins',
                        }}
                        isLoading={isSubmitting}
                        onClick={removeUser}
                    >
                    Remove
                    </Button>
                    <Button
                        type="submit"
                        sx={{
                        width: "475px", // Width as per requirement
                        height: "37px", // Height as per requirement
                        borderRadius: "15px", // Border radius as per requirement
                        backgroundColor: '#95D497',
                        color: 'black',
                        fontWeight: 'bold',
                        _hover: {
                            bg: 'green.200',
                        },
                        fontFamily: 'Poppins',
                        }}
                        isLoading={isSubmitting}
                    >
                        Save User
                    </Button>
                </Flex>
            </Center>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default EditUserModal;
