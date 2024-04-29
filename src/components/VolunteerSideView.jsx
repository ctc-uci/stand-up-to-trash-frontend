import { Flex, Button, Image, Text, HStack, Box, VStack, IconButton, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { getEventById } from '../utils/eventsUtils';
import { EditIcon, CalendarIcon } from '@chakra-ui/icons';
import logos_google_calendar from '../assets/logos_google-calendar.svg';
import logos_google_maps from '../assets/logos_google-maps.svg';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoMdLink } from 'react-icons/io';
import { RxCaretRight } from 'react-icons/rx';
import HappeningInChip from '../components/HappeningInChip/HappeningInChip';
import RegistrationFlowController from '../components/EventRegistration/RegistrationFlowController.jsx';


const VolunteerSideView = ({ eventId, onClose, setShowOpenDrawerButton }) => {
  const [eventData, setEventData] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);
  const [calendarSelected, setCalendarSelected] = useState(false);
  const [mapSelected, setMapSelected] = useState(false);
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
    // setDateObj(new Date(Date.parse(eventData.date)))
  }, [eventId]);

  // console.log('e', eventData);
  // console.log('d', dateObj)
  // console.log(eventId)
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
    <Flex flexDir={'column'} w={'26em'} mt={'1em'} mx={'20px'}>
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
            <Text>Group</Text>
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
            <Text>Registered</Text>
          </Flex>
        </Flex>
        <Flex justify={'space-between'} alignItems={'center'}>
          <Text>Party size</Text>
          <Text fontWeight={'bold'}>12 people</Text>
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
        <Text fontWeight={'medium'} color={'gray'} fontSize={15} textAlign={'start'} width={'full'}>
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
        border={'0.3em solid #EFEFEF'}
        borderRadius={'0.5em'}
        padding={'1em'}
        flexDir={'column'}
        gap={'1em'}
        mb={'1.5em'}
      >
        <Text as="b" textAlign={'left'}>
          Add this event
        </Text>
        <Flex gap={'1em'}>
          <Flex
            backgroundColor={'#EFEFEF'}
            w={'12.5em'}
            padding={'0.8em'}
            borderRadius={'0.5em'}
            justify={'space-between'}
            align={'center'}
            onClick={() => setCalendarSelected(prev => !prev)}
            borderColor={calendarSelected ? 'blue.200' : '#EFEFEF'}
            borderWidth={2}
          >
            <Flex justify={'center'} align={'center'}>
              <Image src={logos_google_calendar} h={'1.3em'} w={'1.3em'} mr={'9%'} />
              <Text fontWeight={600}>Calendar</Text>
            </Flex>
            <Flex justify={'center'} align={'center'}>
              <IconButton
                as={IoMdLink}
                h={'1.3em'}
                w={'1.3em'}
                backgroundColor={calendarSelected ? 'blue.200' : '#EFEFEF'}
              />
            </Flex>
          </Flex>
          <Flex
            backgroundColor={'#EFEFEF'}
            w={'12.5em'}
            padding={'0.8em'}
            align={'center'}
            borderRadius={'0.5em'}
            justify={'space-between'}
            onClick={async () => {
              setMapSelected(prev => !prev);
              const { location } = await getEventById(eventId);
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${location}`);
            }}
            borderColor={mapSelected ? 'blue.200' : '#EFEFEF'}
            borderWidth={2}
          >
            <Flex justify={'center'} align={'center'}>
              <Image src={logos_google_maps} h={'1.3em'} w={'1.3em'} mr={'9%'} />
              <Text fontWeight={600} w={'8em'}>
                Google Map
              </Text>
            </Flex>
            <Flex justify={'center'} align={'center'} h={'1.3em'} w={'1.3em'}>
              <IconButton
                as={IoMdLink}
                h={'1.3em'}
                w={'1.3em'}
                backgroundColor={mapSelected ? 'blue.200' : '#EFEFEF'}
              />
            </Flex>
          </Flex>
        </Flex>
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
  );
};

VolunteerSideView.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
};

export default VolunteerSideView;
