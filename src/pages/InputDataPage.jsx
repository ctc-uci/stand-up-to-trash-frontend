/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import { getEventById } from '../utils/eventsUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import VolunteerEventsTable from '../components/Checkin/VolunteerEventsTable';
import InputDataDashboard from '../components/InputData/InputDataDashboard';
import CheckinInputPageToggle from '../components/Checkin/CheckinInputPageToggle';
import { useNavigate } from 'react-router-dom';
import NavbarContext from '../utils/NavbarContext';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Alert,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';

const InputDataPage = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const [event, setEvent] = useState('');
  const [registered, setRegistered] = useState('');
  const [checkin, setCheckin] = useState('');
  const [trashCollected, setTrashCollected] = useState('');
  const { eventId } = useParams();
  const [displayedVolunteers, setDisplayedVolunteers] = useState([]);
  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 0 is all, 1 is checked-in, 2 is not checked-in, 3 are guests
    setDisplayedVolunteers(volunteerResults.filter(volunteer => volunteer.is_checked_in === true));
  }, [volunteerResults]);

  const setData = async () => {
    try {
      const data = await fetchJoinedEventsById(eventId); // joined data for table rendering
      const event = await getEventById(eventId); // event data for page rendering eg. image src
      setJoinedData(data);
      setEvent(event);
      getRegistered(event.id);
      getCheckin(event.id);
      getTrashCollected(event.id);
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
  }, [input, joinedData, eventId]);

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

  //gets the number of ppl that registered and checked in
  const getRegistered = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      //console.log(event_id);
      const response = await Backend.get(`/stats/register/${event_id}`).then(data => {
        setRegistered(parseInt(data.data));
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
        setCheckin(parseInt(data.data));
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getTrashCollected = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      const response = await Backend.get(`/stats/event/${event_id}`).then(data => {
        setTrashCollected(parseInt(data.data));
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15rem' }}
      px={5}
    >
      <Flex width={'100%'} justifyContent={'space-between'} mt={10} mb={5}>
        <Flex alignItems={'center'} gap={3}>
          <HamburgerIcon
            color={'#717171'}
            boxSize={16}
            display={{ base: 'flex', xl: 'none' }}
            onClick={onNavbarDrawerOpen}
          />
          <Button
            gap={2}
            alignItems={'center'}
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackIcon />
            Back to events
          </Button>
        </Flex>
        <CheckinInputPageToggle eventId={eventId} isCheckinPage={false} />
      </Flex>

      <InputDataDashboard
        event={event}
        registered={registered}
        checkin={checkin}
        trashCollected={trashCollected}
      />

      <Container borderRadius={'xl'} my={18} p={18} bg={'#F8F8F8'} minW={'100%'}>
        {/* SEARCH BAR---- */}
        <Flex gap={3} mb={5}>
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
        </Flex>

        {displayedVolunteers.length != 0 ? (
          <VolunteerEventsTable
            volunteers={displayedVolunteers}
            changeIsCheckedIn={changeIsCheckedIn}
            isCheckinPage={false}
          />
        ) : (
          <Alert status="warning" borderRadius={'8'} w="50%" mx="auto">
            <Box textAlign={'center'} w="100%">
              No volunteers found for current search
            </Box>
          </Alert>
        )}
      </Container>
    </Flex>
  );
};

export default InputDataPage;
