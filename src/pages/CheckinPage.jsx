/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import { getEventById } from '../utils/eventsUtils';
// import { relativeTimeFromDates, inThePast } from '../utils/timeUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import VolunteerEventsTable from '../components/Checkin/VolunteerEventsTable';
import VolunteerTabNavigation from '../components/Checkin/VolunteerTabNavigation';
import { useParams } from 'react-router-dom';
import {
  Container,
  Text,
  Flex,
  Button,
  Box,
  Input,
  useDisclosure,
  Spacer,
  Image,
  InputGroup,
  InputLeftElement,
  Alert,
} from '@chakra-ui/react';
import { GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import RegisterGuestModal from '../components/RegisterGuestModal/RegisterGuestModal';
import HappeningInChip from '../components/HappeningInChip/HappeningInChip';

const CheckinPage = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const [event, setEvent] = useState('');
  const { eventId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedVolunteers, setDisplayedVolunteers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // 0 is all, 1 is checked-in, 2 is not checked-in, 3 are guests
    if (tabIndex === 0) setDisplayedVolunteers(volunteerResults);
    else if (tabIndex === 1)
      setDisplayedVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === true),
      );
    else if (tabIndex === 2)
      setDisplayedVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === false),
      );
    else if (tabIndex === 3)
      setDisplayedVolunteers(volunteerResults.filter(v => v.role === 'guest'));
  }, [tabIndex, volunteerResults]);

  const setData = async () => {
    try {
      const data = await fetchJoinedEventsById(eventId); // joined data for table rendering
      const event = await getEventById(eventId); // event data for page rendering eg. image src
      setJoinedData(data);
      setEvent(event);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      const fuse = new Fuse(
        joinedData.filter(item => item.event_id == eventId || eventId == -1),
        options,
      );
      const searchResult = fuse.search(input);
      const reduceResult = searchResult.map(result => result.item);
      setVolunteerResults(reduceResult);
    }
  }, [input, joinedData]);

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
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dateObject = new Date(Date.parse(event['date']));
    const dateString = `${
      months[dateObject.getMonth()]
    }  ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    if (isNaN(dateObject)) {
      // on page load, prevents displaying "Undefined" as date
      return '';
    }
    return dateString;
  };

  console.log({ displayedVolunteers });

  return (
    <Box bg="#E6EAEF" minH="100vh" ml="15rem">
      <Flex justifyContent="center">
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
      </Flex>

      <Container borderRadius={'xl'} mt={10} bg={'#F8F8F8'} maxW="95%">
        {/* SEARCH BAR---- */}
        <Flex gap={3} mt={5}>
          <InputGroup mt={10}>
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
        </Flex>
        {/* ----SEARCH BAR*/}

        <Flex mb={5} marginTop="4vh">
          <VolunteerTabNavigation volunteerResults={volunteerResults} setTabIndex={setTabIndex} />

          <Spacer />
          <Button
            style={{
              borderRadius: '100px',
            }}
            marginLeft="1vw"
            onClick={onOpen}
            color={'#FFFFFF'}
            background="#1873FB"
          >
            + Add Guest
          </Button>
        </Flex>
        <RegisterGuestModal isOpen={isOpen} onClose={onClose} eventId={eventId} />

        {displayedVolunteers.length != 0 ? (
          <VolunteerEventsTable
            volunteers={displayedVolunteers}
            changeIsCheckedIn={changeIsCheckedIn}
          />
        ) : (
          <Alert status="warning" borderRadius={'8'} w="50%" mx="auto">
            <Box textAlign={'center'} w="100%">
              No volunteers found for current search
            </Box>
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default CheckinPage;
