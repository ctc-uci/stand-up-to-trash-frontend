/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import { getEventById } from '../utils/eventsUtils';
// import { relativeTimeFromDates, inThePast } from '../utils/timeUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import VolunteerEventsTable from '../components/Checkin/VolunteerEventsTable';
import { useParams } from 'react-router-dom';
import {
  Container,
  Text,
  Center,
  Flex,
  Button,
  Box,
  IconButton,
  Input,
  useDisclosure,
  Spacer,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { IoMdPeople } from 'react-icons/io';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { CustomSearchIcon, GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import RegisterGuestModal from '../components/RegisterGuestModal/RegisterGuestModal';
import HappeningInChip from '../components/HappeningInChip/HappeningInChip';

const CheckinPage = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const [event, setEvent] = useState('');
  const [registered, setRegistered] = useState('');
  const [checkin, setCheckin] = useState('');
  const { eventId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchResults = joinedData.filter(item => item.event_id == eventId || eventId == -1);
  const checkedInVolunteers = volunteerResults.filter(
    volunteer => volunteer.is_checked_in === true,
  );
  const notCheckedInVolunteers = volunteerResults.filter(
    volunteer => volunteer.is_checked_in === false,
  );

  const setData = async () => {
    try {
      const data = await fetchJoinedEventsById(eventId); // joined data for table rendering
      const event = await getEventById(eventId); // event data for page rendering eg. image src
      console.log(event);
      setJoinedData(data);
      setEvent(event);
      getRegistered(event.id);
      getCheckin(event.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    // console.log(registered);
  };

  /*
    useEffect for getting joined data on first render
  */
  useEffect(() => {
    setData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    This useffect is used for updating the display volunteer data based on user input utilizing fuzzy search
  */
  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (input.trim() === '') {
      setVolunteerResults(joinedData);
    } else {
      const options = {
        keys: ['first_name', 'last_name', 'email'],
      };
      const fuse = new Fuse(searchResults, options);
      const searchResult = fuse.search(input);
      const reduceResult = searchResult.map(result => result.item);
      setVolunteerResults(reduceResult);
    }
  }, [input, searchResults, joinedData]);

  /*
    updates check in status for a volunteer on the backend, dynamically rerenders it on the frontend
  */
  const changeIsCheckedIn = async event_data_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      const response = await Backend.put(`/data/checkin/${event_data_id}`).then(async () => {
        await setData();
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  // formats dbms date into Month Day, Year
  const getDateString = () => {
    // const months = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    //   'July',
    //   'August',
    //   'September',
    //   'October',
    //   'November',
    //   'December',
    // ];
    const dateObject = new Date(Date.parse(event['date']));
    const dateString = `${[
      dateObject.getMonth(),
    ]}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    if (isNaN(dateObject)) {
      // on page load, prevents displaying "Undefined" as date
      return '';
    }
    return dateString;
  };

  const getTimeString = () => {
    const time = event.time.substring(0, 5);
    const value = parseInt(time.substring(0, 2));
    if (value > 12) {
      return (value - 12).toString() + time.substring(2);
    }
    return time;
  };

  //gets the number of ppl that registered and checked in
  const getRegistered = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      //console.log(event_id);
      const response = await Backend.get(`/stats/register/${event_id}`).then(data => {
        setRegistered(data.data);
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getCheckin = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      const response = await Backend.get(`/stats/checkin/${event_id}`).then(data => {
        setCheckin(data.data);
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box bg="#C8E6FF" minH="100vh" ml="15rem">
      <Box bg="white" p={4} boxShadow="md" borderRadius="lg">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-evenly">
          <VStack align="start" spacing={3}>
            <Box position="relative">
              {event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}
            </Box>
            <Text fontSize="2xl" fontWeight="bold">
              Christmas Beach Cleanup
            </Text>
            <HStack align="center" spacing={2}>
              <CalendarIcon />
              <Text>{getDateString()}</Text>
            </HStack>
            <HStack align="center" spacing={2}>
              <FaLocationDot />
              <Text>{event.location}</Text>
            </HStack>
            <HStack align="center" spacing={2}>
              <TimeIcon />
              <Text>{getTimeString()}</Text>
            </HStack>
          </VStack>

          <Button variant="outline" size="sm">
            Event flyer
          </Button>

          <HStack spacing={4}>
            <VStack bg="gray.100" p={50} borderRadius="md" align="center">
              <IoDocumentText size={30} color="lightgreen" />
              <Text fontSize={20}>{event.registered}</Text>
              <Text>Registered</Text>
              <Text fontSize={32}>{registered}</Text>
            </VStack>
            <VStack bg="gray.100" p={50} borderRadius="md" align="center">
              <IoMdPeople size={30} color="purple" />
              <Text fontSize={20}>{event.checkedIn}</Text>
              <Text>Checked-In</Text>
              <Text fontSize={32}>{checkin}</Text>
            </VStack>
          </HStack>
        </Flex>
      </Box>

      {/* <Box w="100%" h="15rem" bg="white">
        <HStack w="100%" h="15rem" align="center" justify="space-between" p={4}>
          <VStack align="start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Christmas Beach Cleanup
            </Text>
            <HStack spacing={4}>
              <CalendarIcon />
              <Text fontSize="md">{event.date}</Text>
              <InfoOutlineIcon />
              <Text fontSize="md">{event.location}</Text>
              <TimeIcon />
              <Text fontSize="md">{event.time}</Text>
              <Button size="sm" variant="outline">
                Event flyer
              </Button>
            </HStack>
          </VStack>

          <HStack>
            <VStack bg="gray.200" p={4} borderRadius="md">
              <CalendarIcon />
              <Text fontSize="xl">{event.registered}</Text>
              <Text>Registered</Text>
            </VStack>
            <VStack bg="gray.200" p={4} borderRadius="md">
              <CalendarIcon />
              <Text fontSize="xl">{event.checkedIn}</Text>
              <Text>Checked-In</Text>
            </VStack>
          </HStack>
        </HStack>
      </Box> */}

      {/* <Box w="100%" h="15rem" bg="white" position="relative">
        <HStack w="100%" h="15rem" position="relative" align="stretch" spacing={10}>
          <VStack bg="yellow" alignItems="start" spacing={2} align="stretch" w="50%">
            <Box bottom="80%" right="80%">
              {event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}
            </Box>
            <Text>Christmas Beach Cleanup</Text>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems={'center'}>
                <GridItem colSpan={1}>
                  <VStack spacing={2} alignItems={'start'}>
                    <CalendarIcon />
                    <FaLocationDot />
                    <TimeIcon />
                  </VStack>
                </GridItem>
                <GridItem colEnd={3}>
                  <Button size="xs">flyer</Button>
                </GridItem>
              </Grid>
            </Box>
          </VStack>{' '}
          <Box bg="gray" w="13rem" h="13rem">
            <CalendarIcon />
            <Text>h1</Text>
          </Box>
          <Box bg="gray" w="13rem" h="13rem">
            <CalendarIcon />
            <Text>h1</Text>
          </Box>
        </HStack>
      </Box> */}

      {/* <Flex justifyContent="center">
        <Box w="100%" h="15rem" bg="white" position="relative">
          <Image
            src={event['image_url']}
            objectFit="cover"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
          />
          <Flex position="absolute" top="60%" right="57%" direction="column" width="40%">
            <Text color="white" fontSize="4xl" fontWeight="bold">
              {event['name']}
            </Text>
            <Text color="white">{getDateString()}</Text>
          </Flex>
          <Box position="absolute" top="80%" left="90%">
            {event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}
          </Box>
        </Box>
      </Flex> */}
      <Center>
        <Flex width="93%" gap={3} mt={5}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" top={'6px'} left={'5px'}>
              <GreyCustomSearchIcon w={'24px'} h={'18px'} />
            </InputLeftElement>
            <Input
              value={input}
              onChange={event => setInput(event.target.value)}
              borderRadius="15px"
              backgroundColor="#FFFFFF"
              height="53px"
              width="100%"
              padding={'13px, 16px, 12px, 16px'}
              paddingLeft={'50px'}
              border="1px solid #E2E8F0"
              placeholder='Search Volunteer Name (e.g. "John Doe")'
            />
          </InputGroup>
          <IconButton
            icon={<CustomSearchIcon w={'24px'} h={'24px'} />}
            width="69px"
            height="53px"
            borderRadius="15px"
            background="#2D558A"
          />
        </Flex>
      </Center>
      <Container maxW="95%">
        <Container
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: '3vh',
            gap: '1vw',
          }}
        ></Container>
        <Flex mb={5}>
          <Button
            style={{
              borderRadius: '100px',
              backgroundColor: `${showCheckedIn ? '#FFFFFF' : '#2D558A'}`,
              color: `${showCheckedIn ? '#000000' : '#FFFFFF'}`,
            }}
            marginTop="3vh"
            onClick={() => setShowCheckedIn(false)}
          >
            not checked-in
          </Button>
          <Button
            style={{
              borderRadius: '100px',
              backgroundColor: `${showCheckedIn ? '#2D558A' : '#FFFFFF'}`,
              color: `${showCheckedIn ? '#FFFFFF' : '#000000'}`,
            }}
            marginLeft="1vw"
            marginTop="3vh"
            onClick={() => setShowCheckedIn(true)}
          >
            checked-in
          </Button>
          <Spacer />
          <Button
            style={{
              borderRadius: '100px',
              mixBlendMode: 'Luminosity',
            }}
            marginLeft="1vw"
            marginTop="3vh"
            onClick={onOpen}
            background="#EFEFEF"
          >
            + register new volunteer
          </Button>
        </Flex>
        <RegisterGuestModal isOpen={isOpen} onClose={onClose} eventId={eventId} />

        {showCheckedIn &&
          (checkedInVolunteers.length != 0 ? (
            <VolunteerEventsTable
              volunteers={checkedInVolunteers}
              changeIsCheckedIn={changeIsCheckedIn}
            />
          ) : (
            ''
          ))}
        {!showCheckedIn &&
          (notCheckedInVolunteers.length != 0 ? (
            <VolunteerEventsTable
              volunteers={notCheckedInVolunteers}
              changeIsCheckedIn={changeIsCheckedIn}
            />
          ) : (
            ''
          ))}
      </Container>
    </Box>
  );
};

export default CheckinPage;
