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
  Select,
  Center,
  useToast,
  Flex,
} from '@chakra-ui/react';
import Backend from '../../utils/utils';
import Dropzone from '../Dropzone'; // Make sure the path is correct based on your project structure

const AddUserModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const toast = useToast();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const postUserData = async (formData) => {
    const updatedFormData = {
      ...formData,
      profile_image: selectedImage, // Use the image URL from the Dropzone component
      role: 'admin',
    };

    try {
      const endpoint = `/profiles`;
      const response = await Backend.post(endpoint, updatedFormData);

      if (!response.ok) {
        throw new Error(`Failed to add user. Status code: ${response.status}`);
      }

      toast({
        title: "User added successfully.",
        description: "A new user has been added.",
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
            <Flex direction="column" align="center" justify="center" gap="20px">
              <Dropzone
                setEventData={(data) => setSelectedImage(data.imageUrl)}
                eventData={{ imageUrl: selectedImage }}
                setIsLoading={() => {}}
              />
              <FormControl>
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>First Name</FormLabel>
                <Input {...register('first_name')} />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Last Name</FormLabel>
                <Input {...register('last_name')} />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Email</FormLabel>
                <Input {...register('email')} type="email" />
              </FormControl>
              <FormControl>
                  <FormLabel sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Add Role</FormLabel>
                  <Input value="admin" disabled={true} />
              </FormControl>
              <FormControl>
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
            </Flex>
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
