import {
  Box,
  Button,
  Checkbox,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  Stack,
  Text,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useToast,
  IconButton,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import pencil_icon from '../../Assets/pencil_icon.png';
import PropTypes from 'prop-types';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import { CreateEventIcon, CancelIcon } from '../Icons/EventsModalIcons.jsx';
import { useState, useRef } from 'react';
import { putEvent } from '../../utils/eventsUtils.js';
import Dropzone from '../Dropzone.tsx';
import GetMapDirectionsButton from '../GetMapDirectionsButton/GetMapDirectionsButton.jsx';
import ExportButton from '../ExportCSVButton/ExportButton';
import HappeningInChip from '../HappeningInChip/HappeningInChip.jsx';

import { useNavigate } from 'react-router-dom';

const EventCard = ({
  id,
  name,
  description,
  location,
  date,
  showSelect,
  image_url,
  isSelected,
  handleCheckboxChange,
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Placeholder for testing a high-res image
  // image_url = "https://s3-alpha-sig.figma.com/img/925a/d6ba/98e5fc832087ccc9eb019a8562418d70?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hmVTqMVJanXYQRLkiQ91N0JuEs6HSNy3zmb28YJAdYA4ZaA7hJpZEvoc5jQwIPEqcVV4msa8S4Azw49FqP6jBPiSQyE-Q5u41YMTPge1HaDhA2eQ7me21XG1hlJ~qeOQ3se7sk35~qVkkdaRruV7tBRDsc-Y980XKneuEAfggh35IQJqIn3~HvVb0WogiqR8SYsVOy2FQhlStCRojrOgzhO5YmwdKuwWozhmBuqYNEl6sm45YfLTCfinIci8E8fflDlTtlUhDwUlBpGu0k5ojol7GP2Czwv-ggac6Yijbj~rkDzdWfmj0Vs-7FqgyFtRsSaAvChFPn0yVcaZjrWS1g__";
  const dateObj = new Date(Date.parse(date));
  const dateStr = `${dateObj.toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })}, ${dateObj.toLocaleString('default', { year: 'numeric' })} @  ${dateObj.toLocaleString(
    'default',
    { timeStyle: 'short' },
  )}`;

  return (
    <>
      <Box
        // width="293px"
        // height="250px"
        bg={'white'}
        display="flex"
        flexDir="column"
        cursor={'pointer'}
        justifyContent={'space-between'}
        borderRadius="30px"
        onClick={() => (showSelect ? handleCheckboxChange(id) : onOpen())}
        // background={`linear-gradient(0deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%), url(${image_url})`}
        // backgroundSize="cover"
      >
        {/* {showSelect ? (
          <Checkbox
            id={id}
            marginLeft="10px"
            marginBottom="200px"
            style={{ borderRadius: '100px' }}
            isChecked={isSelected}
            onChange={() => handleCheckboxChange(id)}
          />
        ) : null}
        <Spacer />
        <Text fontSize={18} fontWeight={'bold'} textAlign={'center'} m="4">
          {name}
        </Text>
        <Spacer /> */}

        <Box w={'100%'} display="flex" pointerEvents={'none'} position={'relative'} zIndex={30}>
          {/* Top section, for things like select and edit icons */}
          {showSelect ? (
            <Checkbox
              id={id}
              style={{ borderRadius: '100px' }}
              isChecked={isSelected}
              m="16px"
              borderRadius="25px"
              width="26px"
              variant="circular-lg"
            />
          ) : null}
        </Box>

        <Image
          borderRadius={'xl'}
          mt={5}
          alignSelf={'center'}
          maxW={'88%'}
          h={'11vw'}
          src={image_url}
          objectFit="cover"
        />

        {/* <EditEvents
          id={id}
          name={name}
          description={description}
          location={location}
          date={date}
          time={time}
          image_url={image_url}
          parentClose={onClose}
          getEvents={getEvents}
        /> */}

        <Box px="27px" py="20px">
          <HappeningInChip date={dateObj} />
          {name.length > 20 ? (
            <Text fontWeight="700" fontSize="25px">
              {name.substring(0, 20)}...
            </Text>
          ) : (
            <Text fontWeight="700" fontSize="25px">
              {name}
            </Text>
          )}
          <Text fontSize="15px">{dateStr}</Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="660px" maxW="800px" borderRadius="0">
          <ModalBody p="0">
            <Box display="flex" flexDir="row" h="660px" w="800px">
              <Box flexBasis="60%" display="flex" flexDir="column">
                <Box
                  flexBasis="60%"
                  background={`linear-gradient(0deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%), url(${image_url})`}
                  backgroundSize="cover"
                  display="flex"
                  alignItems="end"
                  p="2"
                >
                  <Stack mx="6">
                    <Heading color={'white'}>{name}</Heading>
                    <Text color={'white'}>{location}</Text>
                  </Stack>
                </Box>
                <Box
                  flexBasis="40%"
                  mx="8"
                  my="4"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDir="column"
                >
                  <Box alignSelf="start">
                    <Heading fontSize={24}>Event Description</Heading>
                    <Text fontSize={18}>{description}</Text>
                  </Box>
                  <Box>
                    <Button
                      color="black"
                      backgroundColor="rgba(149, 189, 212, 0.71)"
                      borderRadius="0"
                      colorScheme={'grey'}
                      as="button"
                      onClick={() => {
                        navigate(`/checkin/${id}`);
                      }}
                      target="_blank"
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                flexBasis="40%"
                bg="rgba(217, 217, 217, 0.40)"
                display="flex"
                justifyItems={'end'}
                alignItems={'center'}
                flexDir={'column'}
                marginTop={10}
                gap={10}
              >
                <ModalCloseButton marginBottom={5} />
                <Leaderboard event_id={id} />
                <GetMapDirectionsButton eventId={id} />
                <ExportButton eventId={id} />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

EventCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  showSelect: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  getEvents: PropTypes.func,
};

export default EventCard;

const EditEvents = ({
  id,
  name,
  description,
  location,
  image_url,
  date,
  time,
  parentClose,
  getEvents,
}) => {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [eventData, setEventData] = useState({
    id: id,
    name: name,
    description: description,
    location: location,
    imageUrl: image_url,
    date: date.slice(0, 10) /* slices at T in the Date string, returning YYYY-MM-DD */,
    time: time.slice(0, 5),
    waiver:
      'Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.',
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef();

  // This is so scuffed
  const handleOpen = async () => {
    await parentClose();
    onOpenEdit();
    await parentClose();
  };

  const handleClose = () => {
    onCloseEdit();
    setEventData({
      name: name,
      description: description,
      location: location,
      imageUrl: image_url,
      date: date.slice(0, 10),
      time: time.slice(0, 5),
      waiver:
        'Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation.',
    });
  };

  const handleSubmit = async () => {
    try {
      toastIdRef.current = toast({
        title: 'Updating Event.',
        description: 'Loading...',
        status: 'loading',
        position: 'bottom-right',
        isClosable: true,
      });
      console.log(eventData);
      await putEvent(eventData);
      getEvents();

      toast.close(toastIdRef.current);
      toast({
        title: 'Event Information Saved.',
        description: `Your edits have been saved.`,
        status: 'success',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
      onCloseEdit();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something Went Wrong.',
        description: 'No Event Updated.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const isSubmittable =
    eventData.date === '' ||
    eventData.description === '' ||
    eventData.imageUrl === '' ||
    eventData.location === '' ||
    eventData.name === '' ||
    eventData.time === '';

  return (
    <>
      <Button
        m="16px"
        justifySelf="end"
        ml="auto"
        border="transparent"
        onClick={handleOpen}
        background={'transparent'}
        marginBottom={'auto'}
      >
        <Image src={pencil_icon} width="26px" />
      </Button>

      <Modal isOpen={isOpenEdit} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          minW={'40%'}
          borderRadius={'30px'}
          boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
        >
          <ModalHeader
            fontSize={'24px'}
            justify={'center'}
            align={'center'}
            fontWeight={'700'}
            lineHeight={'29.05px'}
            marginBottom={'-25px'}
          >
            Edit Event
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <Flex flexDir={'column'} align={'center'} justify={'center'}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Dropzone
                    setData={setEventData}
                    data={eventData}
                    height={'141px'}
                    setIsLoading={setIsLoading}
                  />
                )}
              </Flex>

              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Event Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Beach Cleanup"
                value={eventData.name}
                onChange={e => {
                  setEventData({ ...eventData, name: e.target.value });
                }}
              />
              <Flex flexDirection={'row'}>
                <Flex flexDirection={'column'} width={'100%'} paddingRight={'10px'}>
                  <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                    Date
                  </FormLabel>
                  <Input
                    type="date"
                    value={eventData.date}
                    onChange={e => {
                      setEventData({ ...eventData, date: e.target.value });
                    }}
                  />
                </Flex>
                <Flex flexDirection={'column'} width={'100%'} paddingLeft={'10px'}>
                  <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                    Time
                  </FormLabel>
                  <Input
                    type="time"
                    value={eventData.time}
                    onChange={e => {
                      setEventData({ ...eventData, time: e.target.value });
                    }}
                  />
                </Flex>
              </Flex>
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Location
              </FormLabel>
              <Input
                type="text"
                placeholder="Dana Point"
                value={eventData.location}
                onChange={e => {
                  setEventData({ ...eventData, location: e.target.value });
                }}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Event Description
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Event Description, etc..."
                height={'109px'}
                value={eventData.description}
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

          <ModalFooter justifyContent={'center'}>
            <Button
              leftIcon={<CancelIcon />}
              onClick={handleClose}
              backgroundColor={'#FFFFFF'}
              borderRadius={'30px'}
              marginRight={'10px'}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<CreateEventIcon />}
              backgroundColor={'#95D497'}
              borderRadius={'30px'}
              marginLeft={'10px'}
              onClick={handleSubmit}
              isDisabled={isSubmittable}
            >
              Update Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

EditEvents.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  parentClose: PropTypes.func,
  getEvents: PropTypes.func,
};
