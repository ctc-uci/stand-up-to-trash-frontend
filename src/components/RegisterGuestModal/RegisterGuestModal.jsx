import Backend from '../../utils/utils';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // Corrected import
import { yupResolver } from '@hookform/resolvers/yup';
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

const RegisterGuestModal = ({ isOpen, onClose, eventId }) => {
  const [waiverText, setWaiverText] = useState('');

  useEffect(() => {
    const getWaiverText = async () => {
      const waiverTextData = await Backend.get(`/events/${eventId}`);
      setWaiverText(waiverTextData.data.waiver);
    };
    getWaiverText();
  }, [eventId]);

  const volunteerObject = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').nullable(),
    waiver: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Waiver is required'),
  });

  const [volunteerData] = useState({
    first_name: '',
    last_name: '',
    email: null,
    waiver: false,
  });

  const {
    isOpen: isAgreementOpen,
    onOpen: onAgreementOpen,
    onClose: onAgreementClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: volunteerData, resolver: yupResolver(volunteerObject) });

  const postVolunteerData = async formData => {
    try {
      const volunteer = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      };
      const res = await Backend.post('/profiles/guest', volunteer);
      onClose();
      return res.data;
    } catch (error) {
      console.error('Error registering new volunteer:', error.message);
    }
  };

  const postEventData = async (vol_id, event_id) => {
    try {
      await Backend.post('/data/guestCheckin', {
        volunteer_id: vol_id,
        event_id: event_id,
      });
      onClose();
    } catch (error) {
      console.error('Error registering new volunteer:', error.message);
    }
  };

  const noReload = async (data, event) => {
    event.preventDefault();
    try {
      if (data.email === '') {
        data.email = null;
      }
      
      const validatedData = await volunteerObject.validate(data);
      const res = await postVolunteerData(validatedData);

      if (res) {
        await postEventData(res.id, eventId);
      } else {
        console.log('Error registering new volunteer:', res.message);
      }
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  };
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
                      <Text fontWeight={'bold'}>First Name*</Text>
                      <Input
                        marginTop={5}
                        placeholder="Johnny"
                        alignItems={'center'}
                        {...register('first_name')}
                        type="string"
                      />
                      {errors.first_name && <Text color="red">{errors.first_name.message}</Text>}
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>Last Name*</Text>
                      <Input
                        marginTop={5}
                        placeholder="Appleseed"
                        alignItems={'center'}
                        {...register('last_name')}
                        type="string"
                      />
                      {errors.last_name && <Text color="red">{errors.last_name.message}</Text>}
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
                      {errors.email && <Text color="red">{errors.email.message}</Text>}
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'bold'}>Waiver*</Text>
                      <Checkbox {...register('waiver')}>
                        I agree to the{' '}
                        <Link color="teal.500" onClick={onAgreementOpen}>
                          terms and conditions
                        </Link>
                      </Checkbox>
                      {errors.waiver && <Text color="red">{errors.waiver.message}</Text>}
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
          <ModalBody maxHeight="80vh" overflowY="auto">
            {waiverText}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

RegisterGuestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default RegisterGuestModal;
