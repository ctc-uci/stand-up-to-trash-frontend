/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Dropzone from './Dropzone.tsx';
import { updateProfileImage } from '../utils/profileUtils.js';

const EditProfilePictureModal = ({ isOpen, onClose, userInfo }) => {
  const [photos, setPhotos] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isDropzoneOpen,
    onOpen: onDropzoneOpen,
    onClose: onDropzoneClose,
  } = useDisclosure();
  const uploadPhoto = id => {
    updateProfileImage(id, photos['imageUrl']);
    setIsLoading(false);
  };
  const deletePhoto = id => {
    const res = updateProfileImage(
      id,
      'https://i.pinimg.com/originals/a4/af/12/a4af1288eab8714320fa8453f72d79fd.jpg',
    );
    console.log(res);
  };

  useEffect(() => {}, [photos]);

  // closes dropzone modal when loading finished
  useEffect(() => {
    if (isLoading === false) {
      onDropzoneClose();
    }
  }, [isLoading]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justify={'center'} align={'center'}>
            <Center>
              <Text>Change Profile Photo</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <Stack gap={0}>
            <Center borderWidth="1px" w="100%">
              <Button
                variant="unstyled"
                color="#0075FF"
                onClick={() => {
                  onDropzoneOpen();
                  setIsLoading(true);
                  uploadPhoto(userInfo);
                  onClose();
                }}
              >
                Upload Photo
              </Button>
            </Center>
            <Button
              variant="outline"
              color="red"
              onClick={() => {
                deletePhoto(userInfo);
                onClose();
              }}
            >
              Remove Current Photo
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDropzoneOpen} onClose={onDropzoneClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justify={'center'} align={'center'}>
            <Center>
              <Text>Upload Profile Photo</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Dropzone setIsLoading={setIsLoading} setData={setPhotos} data={photos} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfilePictureModal;
