/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
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
  FormControl,
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
  const [searchResults, setSearchResults] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [checkedInVolunteers, setCheckedInVolunteers] = useState([]);
  const [notCheckedInVolunteers, setNotCheckedInVolunteers] = useState([]);
  const [input, setInput] = useState('');
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const [event, setEvent] = useState('');
  const { eventId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  /*
    Filters on change to joinedData which it relies on, only really necessary once but needs to happen aftr joinedData complete
  */
  useEffect(() => {
    const filterHandler = () => {
      const filterdData = joinedData.filter(item => {
        if (item.event_id == eventId || eventId == -1) {
          return true;
        }
      });
      setSearchResults(filterdData);
    };
    filterHandler();
  }, [joinedData, eventId]);

  /*
    Async function for grabbing all joined data for the specified event
    Also gets the event image
  */
  const setData = async () => {
    try {
      // Fetching joined events data by ID
      const data = await fetchJoinedEventsById(eventId);
      const event = await getEventById(eventId);
      // Mapping the data to components
      // const joinedContainers = data.map(event => (
      //   <JoinedDataContainer data={event} key={event.volunteer_id} />
      // ));

      // Setting the joined data
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
    Sort volunteer results into checked in and not checked in volunteers for rendering
  */
  const sortEventCardsByCheckIn = useCallback(() => {
    if (volunteerResults.length !== 0) {
      setCheckedInVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === true),
      );
      setNotCheckedInVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === false),
      );
    } else {
      setCheckedInVolunteers([]);
      setNotCheckedInVolunteers([]);
    }
  }, [volunteerResults]);

  /*
    update checked in and not checked in volunteers on change to volunteer results - when fuzzy search returns different results
  */
  useEffect(() => {
    sortEventCardsByCheckIn();
  }, [volunteerResults, sortEventCardsByCheckIn]);

  /*
    updates check in status for a volunteer on the backend, dynamically rerenders it on the frontend
  */
  const changeIsCheckedIn = async event_data_id => {
    try {
      const response = await Backend.put(`/data/checkin/${event_data_id}`).then(async () => {
        await setData().then(sortEventCardsByCheckIn);
      });
      // rerender event cards so checked in volunteers show up in the correct category
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
          <FormControl>

          </FormControl>
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
