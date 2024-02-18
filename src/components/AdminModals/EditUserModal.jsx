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
    useToast,
    Flex,
} from '@chakra-ui/react';

import Backend from '../../utils/utils'; 
import Dropzone from '../Dropzone'; 

const EditUserModal = ({
    isOpen,
    onClose,
    profileImage,
    firstName,
    lastName,
    email,
    userId,
  }) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
      defaultValues: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        profile_image: profileImage,
      },
    });
  
    const toast = useToast();
  
    const setEventData = (data) => {
      register('profile_image', { value: data.imageUrl });
    };
  
    const updateUserData = async (formData) => {
      const updatedFormData = {
        ...formData,
        role: 'admin',
      };
  
      try {
        const endpoint = `/profiles/${userId}`;
        const response = await Backend.put(endpoint, updatedFormData);
  
        if (!response.ok) {
          throw new Error(`Failed to update user. Status code: ${response.status}`);
        }
  
        toast({
          title: "User updated successfully.",
          description: "The user's details have been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        console.error('Error updating user:', error);
        toast({
          title: "Error updating user.",
          description: error.toString(),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    const onSubmit = (data, event) => {
      event.preventDefault();
      updateUserData(data);
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
            <Flex direction="column" align="center" justify="center" mb={4}>
                <Dropzone
                    setEventData={setEventData}
                    eventData={{ imageUrl: profileImage }}
                    setIsLoading={() => {}}
                />
            </Flex>

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