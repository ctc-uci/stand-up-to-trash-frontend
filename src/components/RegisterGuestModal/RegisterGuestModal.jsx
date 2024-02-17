import Backend from '../../utils/utils';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // Corrected import
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Center,
  Checkbox,
  Grid,
  GridItem,
  Link,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

const RegisterGuestModal = ({ isOpen, onClose }) => {
  const volunteerObject = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    wavier: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Waiver is required'),
  });

  const [volunteerData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    wavier: false,
  });

  const {
    isOpen: isAgreementOpen,
    onOpen: onAgreementOpen,
    onClose: onAgreementClose,
  } = useDisclosure();

  const { register, handleSubmit } = useForm({ defaultValues: volunteerData });

  const postVolunteerData = async formData => {
    try {
      const volunteer = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      };
      await Backend.post('/profiles/guest', volunteer);
      onClose();
    } catch (error) {
      console.error('Error registering new volunteer:', error.message);
    }
  };

  const noReload = (data, event) => {
    event.preventDefault();
    volunteerObject
      .validate(data)
      .then(function (value) {
        console.log(value);
        postVolunteerData(value);
      })
      .catch(function (err) {
        alert(err);
      });
  };

  console.log(volunteerData);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={'center'}>
            <Text fontWeight={'bold'}>Register New Volunteer</Text>
          </ModalHeader>
          {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
          <form onSubmit={handleSubmit(noReload)}>
            <FormControl>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mt={10}>
                  <Grid
                    templateColumns="repeat(2, 1fr)" // two columns of equal width
                    templateRows="repeat(2, 1fr)" // two rows (adjust if you have more rows)
                    gap={6} // spacing between grid items
                  >
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>First Name</Text>
                      <Input
                        marginTop={5}
                        placeholder="Johnny"
                        alignItems={'center'}
                        {...register('first_name')}
                        type="string"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>Last Name</Text>
                      <Input
                        marginTop={5}
                        placeholder="Appleseed"
                        alignItems={'center'}
                        {...register('last_name')}
                        type="string"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>Email</Text>
                      <Input
                        marginTop={5}
                        placeholder="johnny@gmail.com"
                        alignItems={'center'}
                        {...register('email')}
                        type="string"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>Wavier</Text>
                      <Checkbox {...register('wavier')}>
                        I agree to the{' '}
                        <Link color="teal.500" onClick={onAgreementOpen}>
                          terms and conditions
                        </Link>
                      </Checkbox>
                    </GridItem>
                  </Grid>
                </FormControl>
              </ModalBody>

              <Center p={8}>
                <Button type="submit" color="black" bg="#95D497" w="70%">
                  Add Volunteer
                </Button>
              </Center>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>

      {/* Modal for Agreement */}
      <Modal isOpen={isAgreementOpen} onClose={onAgreementClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>bruh</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

RegisterGuestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterGuestModal;
