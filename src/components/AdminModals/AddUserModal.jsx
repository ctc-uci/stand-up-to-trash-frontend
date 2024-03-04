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
import { postProfile } from '../../utils/profileUtils.js';
import PropTypes from 'prop-types';

export default function AddUserModal({ isOpen, onClose, setAdminData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    role: 'admin',
    email: '',
  });
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await postProfile(userData);

      toast({
        title: 'New administrator added.',
        description: 'New administrator added.',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      setAdminData(prev => [...prev, userData]);
      setUserData({
        first_name: '',
        last_name: '',
        role: 'admin',
        email: '',
      });

      onClose();
    } catch (err) {
      console.log('Error:', err);
      toast({
        title: 'Error creating new administrator.',
        description: 'There was an error creating new administator. Please try again.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const emailRegex = /\S+@\S+\.\S+/;
  const isSubmittable =
    userData.first_name === '' || userData.last_name === '' || !emailRegex.test(userData.email);

  console.log('userData:', userData);

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
              Add New User
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
                    setData={setUserData}
                    data={userData}
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
                    onChange={e => setUserData({ ...userData, first_name: e.target.value })}
                  />
                </Flex>
                <Flex flexDirection={'column'} width={'100%'} paddingLeft={'10px'}>
                  <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Appleseed"
                    onChange={e => setUserData({ ...userData, last_name: e.target.value })}
                  />
                </Flex>
              </Flex>
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="johnny@gmail.com"
                onChange={e => setUserData({ ...userData, email: e.target.value })}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Add Role
              </FormLabel>
              <Input type="text" placeholder="Admin" isDisabled />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Set Account Type
              </FormLabel>
              <Select
                value={userData.role}
                onChange={e => setUserData({ ...userData, role: e.target.value })}
              >
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Button
              backgroundColor={'#95D497'}
              borderRadius={'30px'}
              isDisabled={isSubmittable}
              w={'100%'}
              onClick={handleSubmit}
            >
              Send Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setAdminData: PropTypes.func.isRequired,
};
