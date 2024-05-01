import { Flex, Button, Image, Text, HStack, Box, VStack, IconButton } from '@chakra-ui/react';
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

const VolunteerSideView = ({ eventId, onClose, setShowOpenDrawerButton }) => {
  const [eventData, setEventData] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);
  const [calendarSelected, setCalendarSelected] = useState(false);
  const [mapSelected, setMapSelected] = useState(false);
  // const [dateObj, setDateObj] = useState(new Date());
  const dateObj = new Date(Date.parse(eventData.date));
  // console.log(eventData);

  useEffect(() => {
    getEventById(eventId).then(data => setEventData(data));
    // setDateObj(new Date(Date.parse(eventData.date)))
  }, [eventId]);

  // console.log('e', eventData);
  // console.log('d', dateObj)

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
    <Flex flexDir={'column'} w={'100%'} maxW={'26em'} mt={'1em'} px={{ base: '10px', md: '20px' }}>
      <HStack justify={'center'} align={'center'}>
        <IconButton
          borderRadius="md"
          borderColor="#EFEFEF"
          bg="white"
          variant={'outline'}
          borderWidth={'2px'}
          icon={<RxCaretRight size={22} />}
          onClick={() => {
            onClose();
            setShowOpenDrawerButton(true);
          }}
        />
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
        my={'0.8em'}
        borderColor={'#EFEFEF'}
      >
        <Flex justify={'space-between'} alignItems={'center'}>
          <Text fontWeight={'bold'}>Your event status</Text>
          <Box px={'0.4em'} borderRadius={'md'} bg="gray.200">
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

      <VStack spacing={4} mb={'0.5em'}>
        <Image
          h={{ base: "200px", md: "400px" }} 
          w="100%"
          fit={'cover'}
          borderRadius="md"
          src={eventData.image_url}
        />
        <Text fontWeight={'bold'} fontSize={{ base: "24px", md: "28px" }} textAlign={'start'} w={'100%'}>
          {eventData.name}
        </Text>
        <Text fontWeight={'medium'} color={'gray.500'} fontSize={{ base: "14px", md: "15px" }} textAlign={'start'} w={'100%'}>
          {formatDate(eventData.date)}
        </Text>
        <Text noOfLines={isReadMore ? null : 3} w={'100%'}>
          {eventData.description}
        </Text>
        <Button
          size="sm"
          variant="link"
          colorScheme="blue"
          onClick={() => setIsReadMore(!isReadMore)}
        >
          {isReadMore ? 'Read less...' : 'Read more...'}
        </Button>
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
          rightIcon={<IoMdLink size="18px" color={calendarSelected ? 'white' : 'blue.500'} />}
          size="sm"
          px={2}
          borderColor={calendarSelected ? '#0075FF' : 'transparent'}
          borderWidth="2px"
          _active={{
            borderColor: '#0075FF'
          }}
        >
          Calendar
        </Button>
        <Button
          onClick={async () => {
            setMapSelected(prev => !prev);
            const { location } = await getEventById(eventId);
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`);
          }}
          bg={mapSelected ? 'blue.300' : 'gray.200'}
          leftIcon={<Image src={logos_google_maps} h="1em" w="1em" />}
          rightIcon={<IoMdLink size="18px" color={mapSelected ? 'white' : 'blue.500'} />}
          size="sm"
          px={2}
          borderColor={mapSelected ? '#0075FF' : 'transparent'}
          borderWidth="2px"
          _active={{
            borderColor: '#0075FF'
          }}
        >
          Google Maps
        </Button>
      </HStack>
      </Flex>

      <Button
        w="full"
        backgroundColor={'#0075FF'}
        color={'white'}
        _hover={{ bg: 'blue.500' }}
        size="lg"
      >
        Check-In
      </Button>
    </Flex>
  );
};

VolunteerSideView.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
};

export default VolunteerSideView;
