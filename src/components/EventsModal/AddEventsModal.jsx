import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  IconButton,
  Textarea,
  ChakraProvider,
  extendTheme,
  useToast,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AttachmentIcon, AddIcon } from '@chakra-ui/icons';
import Dropzone from '../Dropzone.tsx';
import { theme } from '../Icons/EventsModalIcons.jsx';
import { postEvent } from '../../utils/eventsUtils.js';

import React from 'react';

const AddEventsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    waiver:
      'Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.',
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const toastIdRef = React.useRef();
  const handleSubmit = async () => {
    try {
      toastIdRef.current = toast({
        title: 'Creating Event.',
        description: 'Loading...',
        status: 'loading',
        position: 'bottom-right',
        isClosable: true,
      });
      // TODO: API request is comment out for now due to form change
      const res = await postEvent(eventData);
      console.log(res);
      toast.close(toastIdRef.current);
      toast({
        title: 'Event Created.',
        description: 'Beach Cleanup Created.',
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
        description: 'No Event Created.',
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

  const isSubmittable =
    eventData.date === '' ||
    eventData.description === '' ||
    eventData.imageUrl === '' ||
    eventData.name === '' ||
    eventData.startTime === '';
  eventData.endTime === '';

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <a href="#" onClick={onOpen}>
        <Box
          height="100%"
          display="flex"
          flexDir="column"
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius="30px"
          backgroundSize="cover"
          bg={'white'}
        >
          <Box px="27px" py="20px" color="white">
            <AddIcon color={'#0075FF'} justifyContent={'center'} boxSize={75} />
          </Box>
        </Box>
      </a>

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
              Create event
            </ModalHeader>
            <ModalHeader
              fontSize={'24px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
            >
              Create a new event
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
                onChange={e => {
                  setEventData({ ...eventData, name: e.target.value });
                }}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'} color={'gray'}>
                Location
              </FormLabel>
              <Input
                type="text"
                placeholder="34199 Selva Rd. Irvine, CA 92629"
                onChange={e => {
                  setEventData({ ...eventData, location: e.target.value });
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
                        onChange={e => {
                          console.log(`date: ${e.target.value}`);
                          setEventData({ ...eventData, date: e.target.value });
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
                          onChange={e => {
                            setEventData({ ...eventData, startTime: e.target.value });
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
                          onChange={e => {
                            setEventData({ ...eventData, endTime: e.target.value });
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
                onChange={e => {
                  setEventData({ ...eventData, description: e.target.value });
                }}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Add Waivers
              </FormLabel>
              <IconButton icon={<AttachmentIcon />} borderRadius={'30px'} />
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
              isDisabled={isSubmittable}
            >
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AddEventsModal;
