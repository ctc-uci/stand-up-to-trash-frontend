import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
  ModalCloseButton,
} from '@chakra-ui/react';
import Dropzone from '../Dropzone.tsx';
import { useState } from 'react';
import { updateProfile, deleteProfile } from '../../utils/profileUtils.js';
import PropTypes from 'prop-types';

export default function EditUserModal({ isOpen, onClose, selectedAdmin, setAdminData, adminData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({
    first_name: selectedAdmin.first_name,
    last_name: selectedAdmin.last_name,
    role: 'admin',
    email: selectedAdmin.email,
    imageUrl: selectedAdmin.image_url,
  });
  const toast = useToast();

  const editAdminDataArray = () => {
    const arrayIndex = adminData.findIndex(admin => admin.id === selectedAdmin.id);

    if (arrayIndex !== -1) {
      const newAdminDataArray = [
        ...adminData.slice(0, arrayIndex),
        currentUserData,
        ...adminData.slice(arrayIndex + 1),
      ];

      return newAdminDataArray;
    }
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(selectedAdmin.id, currentUserData);
      toast({
        title: 'Changes saved.',
        description: 'Changes saved.',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setAdminData(editAdminDataArray());
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error updating administrator.',
        description: 'There was an error updating administator. Please try again.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfile(selectedAdmin.id);
      toast({
        title: 'Administrator removed.',
        description: 'Administrator removed.',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setAdminData(prev => prev.filter(admin => admin.id !== selectedAdmin.id));
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error removing administrator.',
        description: 'There was an error removing administator. Please try again.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  console.log('currentUserData:', currentUserData);

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          minW={'40%'}
          borderRadius={'30px'}
          boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
        >
          <ModalHeader>
            <ModalHeader
              fontSize={'24px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
            >
              Edit Admin
            </ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <Flex flexDir={'column'} align={'center'} justify={'center'}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Dropzone
                    height={'141px'}
                    setIsLoading={setIsLoading}
                    setData={setCurrentUserData}
                    data={currentUserData}
                  />
                )}
              </Flex>

              <Flex flexDirection={'row'}>
                <Flex flexDirection={'column'} width={'100%'} paddingRight={'10px'}>
                  <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Johnny"
                    value={currentUserData.first_name}
                    onChange={e =>
                      setCurrentUserData({ ...currentUserData, first_name: e.target.value })
                    }
                  />
                </Flex>
                <Flex flexDirection={'column'} width={'100%'} paddingLeft={'10px'}>
                  <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Appleseed"
                    value={currentUserData.last_name}
                    onChange={e =>
                      setCurrentUserData({ ...currentUserData, last_name: e.target.value })
                    }
                  />
                </Flex>
              </Flex>
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="johnny@gmail.com"
                value={currentUserData.email}
                onChange={e => setCurrentUserData({ ...currentUserData, email: e.target.value })}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Add Role
              </FormLabel>
              <Input type="text" placeholder="Admin" isDisabled />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Set Account Type
              </FormLabel>
              <Select
                value={currentUserData.role}
                onChange={e => setCurrentUserData({ ...currentUserData, role: e.target.value })}
              >
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'center'} gap={3}>
            <Button
              borderColor={'red'}
              borderWidth={2}
              borderRadius={'30px'}
              backgroundColor={'white'}
              color={'red'}
              w={'50%'}
              onClick={handleDelete}
            >
              Remove User
            </Button>
            <Button
              backgroundColor={'#95D497'}
              borderRadius={'30px'}
              w={'50%'}
              onClick={handleSubmit}
            >
              Save User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedAdmin: PropTypes.object.isRequired,
  setAdminData: PropTypes.func.isRequired,
  adminData: PropTypes.array.isRequired,
};
