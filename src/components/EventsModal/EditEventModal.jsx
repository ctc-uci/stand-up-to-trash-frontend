import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  ChakraProvider,
  extendTheme,
  useToast,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Dropzone from '../Dropzone.tsx';
import { theme } from '../Icons/EventsModalIcons.jsx';
// import { postEvent } from '../../utils/eventsUtils.js';
import { putEvent } from '../../utils/eventsUtils.js';
import PropTypes from 'prop-types';

import React from 'react';

const EditEventsModal = ({ event, isOpen, onClose }) => {
  // const [eventData, setEventData] = useState({
  //   id: event_id,
  //   name: '',
  //   description: "",
  //   imageUrl: '',
  //   date: date,
  //   start_time: startTime,
  //   end_time: endTime,
  //   location: '',
  //   waiver:
  //     'Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.',
  // });

  const [eventData, setEventData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  const toast = useToast();
  const toastIdRef = React.useRef();
  const handleSubmit = async () => {
    try {
      toastIdRef.current = toast({
        title: 'Editing Event.',
        description: 'Loading...',
        status: 'loading',
        position: 'bottom-right',
        isClosable: true,
      });
      // TODO: API request is comment out for now due to form change
      const response = await putEvent(eventData);
      console.log(response);
      console.log(eventData);
      toast.close(toastIdRef.current);
      toast({
        title: 'Event Edited.',
        description: 'Beach Cleanup Edited.',
        status: 'success',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      // window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something Went Wrong.',
        description: 'No Event Edited.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    onClose();
    setEventData({
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      date: '',
      startTime: '',
      endTime: '',
      waiver:
        'Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.',
    });
  };


  const manipulateDate = () => {
    const dateObject = new Date(Date.parse(event['date']));
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    setEventDate(formattedDate);
  }

  const manipulateStartTime = () => {
    if (!eventData || !eventData.start_time) {
      return '';
    }
    const time = eventData.start_time.substring(0, 5);
    const hour = parseInt(time.substring(0, 2));
    const minute = time.substring(3);
    
    // Format hour and minute with leading zeros
    const formattedHour = (hour < 10 ? '0' : '') + hour;
    const formattedMinute = (minute < 10 ? '0' : '') + minute;
    console.log(formattedHour + ':' + formattedMinute);
    setEventStartTime(formattedHour + ':' + formattedMinute);
  };

  const manipulateEndTime = () => {
    if (!eventData || !eventData.end_time) {
      return '';
    }
    const time = eventData.end_time.substring(0, 5);
    const hour = parseInt(time.substring(0, 2));
    const minute = time.substring(3);
    
    // Format hour and minute with leading zeros
    const formattedHour = (hour < 10 ? '0' : '') + hour;
    const formattedMinute = (minute < 10 ? '0' : '') + minute;
    console.log(formattedHour + ':' + formattedMinute);
    setEventEndTime(formattedHour + ':' + formattedMinute);
  };

  useEffect(() => {
  //  setEventDate(date);
  //  setEventStartTime(startTime);
  //  setEventEndTime(endTime);
   setEventData(event);
   manipulateDate();
  }, [isOpen]);

  useEffect(() => {
    if (eventData) {
        manipulateStartTime();
        manipulateEndTime();
    }
 }, [eventData]);
  

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent
          minW={'40%'}
          borderRadius={'30px'}
          boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
        >
          <ModalHeader>
            <ModalHeader
              fontSize={'16px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
              color={'gray'}
            >
              Edit event
            </ModalHeader>
            <ModalHeader
              fontSize={'24px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
            >
              Edit an event
            </ModalHeader>
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <Flex flexDir={'column'} align={'center'} justify={'center'}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    border="5px dashed gray"
                    borderRadius="33"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: 'gray.100',
                      cursor: 'pointer',
                    }}
                  >
                    <Dropzone setData={setEventData} data={eventData} setIsLoading={setIsLoading} />
                  </Box>
                )}
              </Flex>

              <FormLabel
                paddingTop={'10px'}
                fontWeight={'700'}
                fontSize={'12px'}
                mt={4}
                color={'gray'}
              >
                Event Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Beach Cleanup"
                value={eventData?.name}
                onChange={e => {
                  setEventData({ ...eventData, name: e.target.value });
                }}
              />
              <FormControl mt={4}>
                <Box border="1px solid" borderColor="gray.200" p={4} borderRadius="lg">
                  <FormLabel fontWeight={'700'} fontSize={'18px'} mb={2}>
                    Date and time
                  </FormLabel>
                  <Flex flexDirection="column" gap={4}>
                    <Box>
                      <FormLabel fontSize={'14px'} mb={1}>
                        Date
                      </FormLabel>
                      <Input
                        id="date"
                        type="date"
                        size="lg"
                        borderRadius="8px"
                        value={eventDate}
                        onChange={e => {
                          setEventData({ ...eventData, date: e.target.value });
                          setEventDate(e.target.value);
                        }}
                      />
                    </Box>

                    {/* Time inputs row */}
                    <Flex justifyContent="space-between" gap={4}>
                      <Box flex="1">
                        <FormLabel fontSize={'14px'} mb={1}>
                          From
                        </FormLabel>
                        <Input
                          id="time-from"
                          type="time"
                          size="lg"
                          borderRadius="8px"
                          value={eventStartTime}
                          onChange={e => {
                            setEventData({ ...eventData, startTime: e.target.value });
                            setEventStartTime(e.target.value);
                          }}
                        />
                      </Box>
                      <Box flex="1">
                        <FormLabel fontSize={'14px'} mb={1}>
                          To
                        </FormLabel>
                        <Input
                          id="time-to"
                          type="time"
                          size="lg"
                          borderRadius="8px"
                          value={eventEndTime}
                          onChange={e => {
                            setEventData({ ...eventData, end_time: e.target.value });
                            setEventEndTime(e.target.value);
                          }}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </FormControl>

              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'} color={'gray'}>
                Event Description
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Enter details of the event here..."
                height={'109px'}
                value={eventData?.description}
                onChange={e => {
                  setEventData({ ...eventData, description: e.target.value });
                }}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Waiver
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Enter waiver here..."
                height={'109px'}
                value={eventData?.waiver}
                onChange={e => {
                  setEventData({ ...eventData, description: e.target.value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'flex-end'}>
            <Button onClick={handleCancel} borderRadius={'5px'} marginRight={'10px'} paddingX={10}>
              Cancel
            </Button>
            <Button
              backgroundColor={'#587df7'}
              borderRadius={'5px'}
              marginLeft={'10px'}
              paddingX={5}
              color={'white'}
              onClick={handleSubmit}
            >
              Edit Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

EditEventsModal.propTypes = {
  event: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEventsModal;
