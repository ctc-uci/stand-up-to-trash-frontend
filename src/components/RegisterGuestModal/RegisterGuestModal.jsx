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
  useDisclosure,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IoMdPeople } from 'react-icons/io';

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
    email: yup.string().email('Invalid email format').nullable().notRequired(),
    waiver: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Waiver is required'),
  });

  const [volunteerData, setVolunteerData] = useState({
    first_name: '',
    last_name: '',
    email: null,
    waiver: false,
  });

  const {
    isOpen: isAgreementOpen,
    // onOpen: onAgreementOpen,
    onClose: onAgreementClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: volunteerData, resolver: yupResolver(volunteerObject) });

  const isFormIncomplete = () => {
    return (
      volunteerData.first_name === '' ||
      volunteerData.last_name === '' ||
      volunteerData.waiver === false
    );
  };

  const postVolunteerData = async formData => {
    try {
      const volunteer = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        party_number: formData.party_number,
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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent borderRadius={'22px'} padding={5} width={'80%'}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />
          <ModalHeader alignSelf={'center'} padding={50}>
            <Text fontSize={'18px'} textAlign={'center'} fontWeight={'medium'} color={'#717171'}>
              Add volunteer
            </Text>
            <Text fontWeight={'bold'} fontSize={'28px'}>
              Add Guest Volunteer
            </Text>
          </ModalHeader>
          {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
          <form onSubmit={handleSubmit(noReload)}>
            <FormControl>
              <ModalBody>
                <FormControl>
                  <Grid
                    // templateColumns="repeat(2, 1fr)" // two columns of equal width
                    templateRows="repeat(2, 1fr)" // two rows (adjust if you have more rows)
                    gap={6} // spacing between grid items
                  >
                    <GridItem colSpan={1}>
                      <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                        First Name*
                      </Text>
                      <Input
                        marginTop={1}
                        placeholder="Johnny"
                        alignItems={'center'}
                        {...register('first_name')}
                        type="string"
                        onChange={e =>
                          setVolunteerData(prevState => ({
                            ...prevState,
                            first_name: e.target.value,
                          }))
                        }
                      />
                      {errors.first_name && <Text color="red">{errors.first_name.message}</Text>}
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                        Last Name*
                      </Text>
                      <Input
                        marginTop={1}
                        placeholder="Appleseed"
                        alignItems={'center'}
                        {...register('last_name')}
                        type="string"
                        onChange={e =>
                          setVolunteerData(prevState => ({
                            ...prevState,
                            last_name: e.target.value,
                          }))
                        }
                      />
                      {errors.last_name && <Text color="red">{errors.last_name.message}</Text>}
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                        Party size
                      </Text>
                      <InputGroup>
                        <InputLeftElement paddingTop="0.5em">
                          <IoMdPeople size={'1.7em'} color="gray" />
                        </InputLeftElement>
                        <Input
                          marginTop={1}
                          placeholder="1"
                          alignItems={'center'}
                          {...register('party_number')}
                          type="string"
                          onChange={e =>
                            setVolunteerData(prevState => ({
                              ...prevState,
                              party_number: e.target.value,
                            }))
                          }
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                        Email
                      </Text>
                      <Input
                        marginTop={1}
                        placeholder="johnny@gmail.com"
                        alignItems={'center'}
                        {...register('email')}
                        type="string"
                        onChange={e =>
                          setVolunteerData(prevState => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
                      />
                      {errors.email && <Text color="red">{errors.email.message}</Text>}
                    </GridItem>
                    <Text fontWeight={'medium'} fontSize={'14px'} color={'#717171'}>
                      Read terms and conditions
                    </Text>
                    <GridItem
                      colSpan={2}
                      height="200px"
                      overflowY={'scroll'}
                      border={'3px solid #EFEFEF'}
                      borderRadius={'12px'}
                      padding={'12px'}
                    >
                      <Text alignItems={'center'}>
                        Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION
                        OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my
                        services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned
                        tasks that are within my physical capability, and I will not undertake tasks
                        that are beyond my ability; 3. I will not participate if under the influence
                        of alcohol or any drug that could impair my physical or mental abilities; 4.
                        I have received appropriate instruction regarding this Event, including
                        appropriate safety and emergency procedures, I fully understand those
                        instructions, and I agree, after proper inspection, to use only the
                        supplies, tools and equipment provided by Event organizers; 5. I will
                        perform only those tasks assigned, observe all safety rules, and use care in
                        the performance of my assignments; 6. Stand Up To Trash will not be held
                        liable or responsible in any way for any injury, death or other damages to
                        me or my family, heirs, or assigns that may occur as a result of my
                        participation in the Event, or as a result of product liability or the
                        negligence, whether passive or active, of any party, including Released
                        Parties, in connection with the Event. I understand that cleaning up beaches
                        or inland water areas involves certain inherent risks, including but not
                        limited to, the risks of possible injury, infection or loss of life as a
                        result of contact with needles, condoms, metal objects, burning embers or
                        other hazardous materials, wild animals, poisonous plants, snakes, or from
                        over-exertion or environmental conditions, including but not limited to
                        flooding, rockslides, sun exposure, or dangerous terrain. No known physical
                        or health limitation prevents me from safely participating in this Event. In
                        Consideration for being allowed to participate, I personally assume all
                        risks, whether foreseen or unforeseen, in connection with the Event of any
                        harm, injury or damage that may befall me as a participant. If I am injured
                        during the Event, I authorize any physician licensed in California to
                        perform such emergency treatment as he or she believes, in his or her sole
                        judgment, may be necessary. I am over the age of eighteen and legally
                        competent to sign this liability release, or I have acquired the written
                        consent of my parent or guardian. I understand that the terms herein are
                        contractual and not a mere recital, this instrument is legally binding, and
                        I have signed this document of my own free act. I agree to allow my image to
                        be used in published materials and web sites that promote the programs of
                        Stand Up To Trash. By including my email address below, I understand that
                        Stand Up To Trash may contact me about future Stand Up To Trash events and
                        other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up
                        To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR
                        WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF
                        PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE
                        ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON
                        NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR
                        ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY
                        RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip
                        E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST
                        SIGN. I am the parent or legal guardian of the above participant and he/she
                        has my permission to participate in the Stand Up To Trash Beach Cleanup. I
                        have read and agree to the provisions stated above for myself and the
                        participant. Further, I understand and agree that the sponsors and
                        organizers of the Event are not responsible for supervision of minor
                        participants and that if I allow the above minor to participate without my
                        supervision, I assume all the risks from such participation.
                      </Text>
                    </GridItem>

                    <GridItem colSpan={2}>
                      <Checkbox
                        {...register('waiver')}
                        style={{
                          alignContent: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                        }}
                        onChange={e =>
                          setVolunteerData(prevState => ({
                            ...prevState,
                            waiver: e.target.checked,
                          }))
                        }
                      >
                        I agree to the terms and conditions
                      </Checkbox>
                      {errors.waiver && <Text color="red">{errors.waiver.message}</Text>}
                    </GridItem>
                  </Grid>
                </FormControl>
              </ModalBody>

              <Center p={8} style={{ gap: '12px' }}>
                <Button
                  color="#3B3B3B"
                  bg="#EFEFEF"
                  w="70%"
                  h="50px"
                  style={{ borderRadius: '12px' }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="white"
                  bg="#003FE3"
                  w="70%"
                  h="50px"
                  style={{ borderRadius: '12px' }}
                  _hover={{ bg: '#002B99' }}
                  isDisabled={isFormIncomplete()}
                >
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
        <ModalContent borderRadius={'22px'}>
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
