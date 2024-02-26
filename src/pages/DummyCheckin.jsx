/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import { getEventById } from '../utils/eventsUtils';
// import { relativeTimeFromDates, inThePast } from '../utils/timeUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import VolunteerEventsTable from '../components/DummyCheckin/VolunteerEventsTable';
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
  Image,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { CustomSearchIcon, GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import RegisterGuestModal from '../components/RegisterGuestModal/RegisterGuestModal';
import HappeningInChip from '../components/HappeningInChip/HappeningInChip';

const DummyCheckin = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const [event, setEvent] = useState('');
  const { eventId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchResults = joinedData.filter(item => (item.event_id == eventId) || (eventId == -1));
  const checkedInVolunteers = volunteerResults.filter(volunteer => volunteer.is_checked_in === true);
  const notCheckedInVolunteers = volunteerResults.filter(volunteer => volunteer.is_checked_in === false);

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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObject = new Date(Date.parse(event['date']));
    const dateString = `${months[dateObject.getMonth()]}  ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    if (isNaN(dateObject)) { // on page load, prevents displaying "Undefined" as date
      return '';
    }
    return dateString;
  }

  return (
    <Box bg="#C8E6FF" minH="100vh">
      <Flex justifyContent="center">
        <Box
          w="100%"
          h="15rem"
          bg="white"
          position="relative"
        >
          <Image src={event['image_url']} objectFit="cover" width="100%" height="100%" bg="rgba(217, 217, 217, 0.72)" />
          <Flex position="absolute" top="60%" right="57%" direction="column" width="40%">
              <Text color="white" fontSize="4xl" fontWeight="bold">{event['name']}</Text>
              <Text color="white">{getDateString()}</Text>
          </Flex>
          <Box position="absolute" top="80%" left="90%">
            {event && <HappeningInChip date={new Date(Date.parse(event['date']))}/>}
          </Box>
        </Box>
      </Flex>
      <Center>
        <Flex width="93%" gap={3} mt={5}>
              <InputGroup>
                <InputLeftElement pointerEvents='none' top={'6px'} left={'5px'}>
                  <GreyCustomSearchIcon w={'24px'} h={'18px'}/>
                </InputLeftElement>
                <Input
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  borderRadius='15px'
                  backgroundColor='#FFFFFF'
                  height='53px'
                  width='100%'
                  padding={'13px, 16px, 12px, 16px'}
                  paddingLeft={"50px"}
                  border='1px solid #E2E8F0'
                  placeholder='Search Volunteer Name (e.g. "John Doe")'
              />
              </InputGroup>
              <IconButton
                icon={<CustomSearchIcon w={'24px'} h={'24px'}/>}
                width='69px'
                height='53px'
                borderRadius='15px'
                background='#2D558A'
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
        >
        </Container>
        <Flex mb={5}>
          <Button
            style={{
              borderRadius: '100px',
              backgroundColor: `${showCheckedIn ? '#FFFFFF' : '#2D558A'}`,
              color: `${showCheckedIn ? '#000000' : '#FFFFFF'}`
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
              color: `${showCheckedIn ? '#FFFFFF' : '#000000'}`
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
              mixBlendMode: 'Luminosity'
            }}
            marginLeft="1vw"
            marginTop="3vh"
            onClick={onOpen}
            background='#EFEFEF'
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

export default DummyCheckin;
