/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Button,
  Text,
  Center,
  Box,
  Stack,
} from '@chakra-ui/react';
import Dropzone from './Dropzone.tsx';
import Backend from '../utils/utils';


const EditProfilePictureModal = ({ isOpen, onClose, userInfo }) => {
  const uploadPhoto = () => {

  }

  useEffect(() => {
    console.log('!!!!!', userInfo);
  }, [userInfo])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader justify={'center'} align={'center'}>
          <Center>
            <Text>
              Change Profile Photo
            </Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
          <Stack gap={0}>
            <Center borderWidth="1px" w="100%">
              <Button variant="unstyled" color="#0075FF" onClick={uploadPhoto}>Upload Photo</Button>
            </Center>
          <Button variant="outline" color="red">Remove Current Photo</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          </Stack>

      </ModalContent>
    </Modal>
  );
};

export default EditProfilePictureModal;
