/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import JoinedDataContainer from '../components/DummySearchVolunteerEvents/JoinedDataContainer';
import VolunteerEventsTable from '../components/DummyCheckin/VolunteerEventsTable';
import { useParams } from 'react-router-dom';
import {
  Container,
  Flex,
  Button,
  Box,
  IconButton,
  FormControl,
  Input
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const DummyCheckin = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [checkedInVolunteers, setCheckedInVolunteers] = useState([]);
  const [notCheckedInVolunteers, setNotCheckedInVolunteers] = useState([]);
  const [input, setInput] = useState('');
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const { eventId } = useParams();

  /*
    Filters on change to joinedData which it relies on, only really necessary once but needs to happen aftr joinedData complete
  */
  useEffect(() => {
    const filterHandler = () => {
      const filterdData = joinedData.filter(item => {
        if (item.props.data.event_id == eventId || eventId == -1) {
          return true;
        }
      });
      setSearchResults(filterdData);
    };
    filterHandler();
  }, [joinedData, eventId]);


  /*
    Async function for grabbing all joined data for the specified event
  */
  const setData = async () => {
    // await fetchEvents().then(data => setEventsData(data));
    console.log(eventId)
    await fetchJoinedEventsById(eventId).then(data => {
      const joinedContainers = data.map(event => {
        return <JoinedDataContainer data={event} key={event.volunteer_id} />;
      });
      setJoinedData(joinedContainers);
    });

  };
  /*
    useEffect for getting joined data on first render
  */
  useEffect(() => {
    setData();
  });

  /*
    This useffect is used for updating the display volunteer data based on user input utilizing fuzzy search
  */
  useEffect(() => {
    const options = {
      keys: ['props.data.first_name', 'props.data.last_name', 'props.data.email'],
    };
    const fuse = new Fuse(searchResults, options);
    const searchResult = fuse.search(input);
    const reduceResult = searchResult.map(result => result.item);
    setVolunteerResults(reduceResult);
  }, [input, searchResults]);

  /*
    Sort volunteer results into checked in and not checked in volunteers for rendering
  */
  const sortEventCardsByCheckIn = useCallback(() => {
    if (volunteerResults.length !== 0) {
      setCheckedInVolunteers(
        volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in === true),
      );
      setNotCheckedInVolunteers(
        volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in === false),
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
      const response = await Backend.put(`/data/checkin/${event_data_id}`).then(
        async () => {
          await setData().then(sortEventCardsByCheckIn)
        }
        );

       // rerender event cards so checked in volunteers show up in the correct category
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Box
          w="88%"
          h="15rem"
          bg="white"
          style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
          mt={1}
        ></Box>
      </Flex>
      <Container maxW="90%">
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
            <Flex>
              <Input
                value={input}
                onChange={event => setInput(event.target.value)}
                borderRadius="0px"
                placeholder='Search Volunteer Name (e.g. "John Doe")'
              />
              <IconButton icon={<SearchIcon />} ml={1}/>
            </Flex>
          </FormControl>
        </Container>

        <Button
          style={{
            borderRadius: '60px',
            backgroundColor: `${showCheckedIn ? '#EFEFEF' : '#696969'}`,
          }}
          marginLeft="1vw"
          marginTop="3vh"
          onClick={() => setShowCheckedIn(false)}
        >
          not checked-in
        </Button>
        <Button
          style={{
            borderRadius: '60px',
            backgroundColor: `${showCheckedIn ? '#696969' : '#EFEFEF'}`,
          }}
          marginLeft="1vw"
          marginTop="3vh"
          onClick={() => setShowCheckedIn(true)}
        >
          checked-in
        </Button>

        {showCheckedIn &&
          (checkedInVolunteers.length != 0 ? (
            <VolunteerEventsTable volunteers={checkedInVolunteers} changeIsCheckedIn={changeIsCheckedIn}/>
          ) : (
            ''
          ))}
        {!showCheckedIn &&
          (notCheckedInVolunteers.length != 0 ? (
            <VolunteerEventsTable volunteers={notCheckedInVolunteers} changeIsCheckedIn={changeIsCheckedIn}/>
          ) : (
            ''
          ))}
      </Container>
    </>
  );
};

export default DummyCheckin;
