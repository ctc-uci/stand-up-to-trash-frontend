import { Flex, Button, Image, Text, HStack, Box, VStack, IconButton } from '@chakra-ui/react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Icon } from '@chakra-ui/react';
import { getEventById } from '../utils/eventsUtils';
import { EditIcon, CalendarIcon } from '@chakra-ui/icons';
import logos_google_calendar from '../assets/logos_google-calendar.svg';
import logos_google_maps from '../assets/logos_google-maps.svg';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoMdLink } from 'react-icons/io';
import { RxCaretRight } from 'react-icons/rx';
import HappeningInChip from './HappeningInChip/HappeningInChip';
import { getEventDataVolunteerId } from '../utils/eventsUtils';
import UserContext from '../utils/UserContext.jsx';
import RegistrationFlowController from '../components/EventRegistration/RegistrationFlowController.jsx';

const VolunteerSideViewDrawer = ({ eventId, isOpen, onClose, setShowOpenDrawerButton }) => {
  const [eventData, setEventData] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);
  const [calendarSelected, setCalendarSelected] = useState(false);
  const [mapSelected, setMapSelected] = useState(false);
  const [eventDataVolunteer, setEventDataVolunteer] = useState([]);
  const { user } = useContext(UserContext);
  console.log('users', user);
  console.log('eventid', eventDataVolunteer[0]);

  // const [dateObj, setDateObj] = useState(new Date());
  const dateObj = new Date(Date.parse(eventData.date));
  // console.log(eventData);

  const {
    isOpen: isRegistrationFlowOpen,
    onOpen: onRegistrationFlowOpen,
    onClose: onRegistrationFlowClose,
  } = useDisclosure();

  useEffect(() => {
    getEventById(eventId).then(data => setEventData(data));
    getEventDataVolunteerId(user?.id, eventId).then(data => setEventDataVolunteer(data));
    // setDateObj(new Date(Date.parse(eventData.date)))
  }, [eventId]);

  function formatDate(dateString) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    console.log('dateString', dateString);
    const date = new Date(dateString);
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const time = dateObj.toLocaleString('default', { timeStyle: 'short' });
    // const time =
    //   date.getUTCHours().toString().padStart(2, '0') +
    //   ':' +
    //   date.getUTCMinutes().toString().padStart(2, '0') +
    //   (hours >= 12 ? ' PM' : ' AM');

    return `${month} ${day}, ${year} @ ${time}`;
  }
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Flex
            flexDir={'column'}
            w={'100%'}
            maxW={'26em'}
            mt={'1em'}
            px={{ base: '10px', md: '20px' }}
          >
            <HStack justify={'center'} align={'center'}>
              <IconButton
                borderRadius="md"
                borderColor="#EFEFEF"
                bg="white"
                variant={'outline'}
                borderWidth={'0.2em'}
                h="40px"
                w="40px"
                icon={<RxCaretRight size={22} />}
                onClick={() => {
                  onClose();
                  setShowOpenDrawerButton(true);
                }}
              ></IconButton>
              <Flex
                bg="#EFEFEF"
                borderRadius="md"
                py={'0.5em'}
                w={'100%'}
                justify={'center'}
                align={'center'}
              >
                <HStack>
                  <Icon viewBox="0 0 200 200" color="green.500">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <Text w={'100%'} fontWeight={600}>
                    <HappeningInChip date={dateObj} />
                  </Text>
                </HStack>
              </Flex>
            </HStack>

            <Box
              p={'0.8em'}
              borderWidth={'0.2em'}
              borderRadius="lg"
              marginY={'0.8em'}
              borderColor={'#EFEFEF'}
            >
              <Flex justify={'space-between'} alignItems={'center'}>
                <Text fontWeight={'bold'}>Your event status</Text>
                <Box px={'0.4em'} borderRadius={'md'} bg="gray.200" mb={'0.3em'}>
                  <EditIcon />
                </Box>
              </Flex>
              <Flex justify={'space-between'} alignItems={'center'}>
                <Text>Type</Text>
                <Flex
                  flexDir={'row'}
                  px={'0.4em'}
                  borderRadius={'md'}
                  bg="gray.200"
                  mb={'0.3em'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'0.3em'}
                >
                  <IoPeopleSharp color="purple" />
                  <Text>{eventDataVolunteer[0]?.number_in_party > 1 ? 'Group' : 'Individual'}</Text>
                </Flex>
              </Flex>
              <Flex justify={'space-between'} alignItems={'center'}>
                <Text>Registration</Text>
                <Flex
                  flexDir={'row'}
                  px={'0.4em'}
                  borderRadius={'md'}
                  borderWidth={'0.15em'}
                  mb={'0.3em'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'0.3em'}
                >
                  <CalendarIcon color="purple" />
                  <Text>{eventDataVolunteer[0]?.is_checked_in ? 'Checked-in' : 'Registered'}</Text>
                </Flex>
              </Flex>
              <Flex justify={'space-between'} alignItems={'center'}>
                <Text>Party size</Text>
                <Text fontWeight={'bold'}>{eventDataVolunteer[0]?.number_in_party}</Text>
              </Flex>
            </Box>

            <VStack mb={'0.5em'} gap={'0.6em'}>
              <Flex justifyContent={'center'} alignItems={'center'} borderRadius={'md'} w={'100%'}>
                <Image
                  h="400px"
                  w="100%"
                  fit={'cover'}
                  borderRadius="md"
                  src={eventData.image_url}
                ></Image>
              </Flex>
              <Text fontWeight={'bold'} fontSize={28} textAlign={'start'} width={'full'}>
                {eventData.name}
              </Text>
              <Text
                fontWeight={'medium'}
                color={'gray'}
                fontSize={15}
                textAlign={'start'}
                width={'full'}
              >
                {formatDate(dateObj)}
              </Text>
              <Text noOfLines={isReadMore ? null : 3}>{eventData.description}</Text>
              <Flex w={'100%'}>
                {!isReadMore && (
                  <Text
                    color={'#0075FF'}
                    fontWeight={600}
                    textAlign={'start'}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    onClick={() => setIsReadMore(true)}
                  >
                    Read more...
                  </Text>
                )}
              </Flex>
            </VStack>

            <Flex
              border={'0.2em solid #EFEFEF'}
              borderRadius={'0.5em'}
              p={'1em'}
              flexDirection={'column'}
              gap={'1em'}
              mb={'1.5em'}
            >
              <Text as="b" textAlign={'left'} fontSize={'lg'}>
                Add this event to:
              </Text>
              <HStack spacing={3}>
                <Button
                  onClick={() => setCalendarSelected(prev => !prev)}
                  bg={calendarSelected ? 'blue.300' : 'gray.200'}
                  leftIcon={<Image src={logos_google_calendar} h="1em" w="1em" />}
                  rightIcon={
                    <IoMdLink size="18px" color={calendarSelected ? 'white' : 'blue.500'} />
                  }
                  size="sm"
                  px={2}
                  borderColor={calendarSelected ? '#0075FF' : 'transparent'}
                  borderWidth="2px"
                  _active={{
                    borderColor: '#0075FF',
                  }}
                >
                  Calendar
                </Button>
                <Button
                  onClick={async () => {
                    setMapSelected(prev => !prev);
                    const { location } = await getEventById(eventId);
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`,
                    );
                  }}
                  bg={mapSelected ? 'blue.300' : 'gray.200'}
                  leftIcon={<Image src={logos_google_maps} h="1em" w="1em" />}
                  rightIcon={<IoMdLink size="18px" color={mapSelected ? 'white' : 'blue.500'} />}
                  size="sm"
                  px={2}
                  borderColor={mapSelected ? '#0075FF' : 'transparent'}
                  borderWidth="2px"
                  _active={{
                    borderColor: '#0075FF',
                  }}
                >
                  Google Maps
                </Button>
              </HStack>
            </Flex>

            <Button backgroundColor={'#0075FF'} color={'white'} onClick={onRegistrationFlowOpen}>
              Register
            </Button>
            {isRegistrationFlowOpen && (
              <RegistrationFlowController
                isOpen={isRegistrationFlowOpen}
                onClose={onRegistrationFlowClose}
                eventId={eventId}
              />
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

VolunteerSideViewDrawer.propTypes = {
  eventId: PropTypes.string.isRequired,
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
};

export default VolunteerSideViewDrawer;
