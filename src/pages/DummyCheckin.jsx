/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Input } from '@chakra-ui/react';
import { fetchEvents, fetchJoinedEvents } from '../utils/fuseUtils';
import { Heading, Text, Card, CardHeader, CardBody, Checkbox, Flex, Button, Box } from '@chakra-ui/react';
// import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import JoinedDataContainer from '../components/DummySearchVolunteerEvents/JoinedDataContainer';
import Backend from '../utils/utils';

const DummyCheckin = () => {
  const [eventsData, setEventsData] = useState([]);
  const [joinedData, setJoinedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const {eventId} = useParams();
  const [showCheckedIn, setShowCheckedIn] = useState(false);


  /*
  Filters on change to joinedData which it relies on, only really necessary once but needs to happen aftr joinedData complete
  */
  useEffect(() => {
    filterHandler();
  }, [joinedData]);

  useEffect(() => {
    console.log(`IsCheckedIn = ${showCheckedIn}`);
  }, [showCheckedIn]);

  useEffect(() => {
    // if (volunteerResults.length != 0) {
    //   console.log(`volunteerResults = ${JSON.stringify(volunteerResults[0].props.data.is_checked_in)}`);
    // }
  }, [volunteerResults]);

  /*
    This asynchronous function updates the checkin status of an eventData entry, if its true it becomes false, if its false it becomes true
  */
  const changeIsCheckedIn = async eventData => {
    console.log("went thru")
    const { event_data_id } = eventData;
    try {
      const response = await Backend.put(`/data/checkin/${event_data_id}`);
      setEventsData(prevEventsData =>
        prevEventsData.map(event =>
          event.event_data_id === event_data_id
            ? { ...event, is_checked_in: !event.is_checked_in }
            : event,
        ),
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const EventCard = ({ eventData }) => {
    return (
      <Card key={`${eventData.event_data_id}-${eventData.is_checked_in}`}>
        <CardBody>
          <Flex>
            <Text m={3} justifyContent='center'>{eventData.first_name}</Text>
            <Button
              onClick={() => changeIsCheckedIn(eventData)}
              style={{backgroundColor: '#95D497'}}
              borderRadius='0px'
            >
              Check-in
            </Button>
          </Flex>
        </CardBody>
      </Card>
    );
  };

  /*
    This is the filtered data based on the user's selection
  */
    const filterHandler = () => {
      console.log(joinedData)
      const filterdData = joinedData.filter(item => {
        if (item.props.data.event_id == eventId || eventId == -1) {
          return true;
        }
      });
      setSearchResults(filterdData);
    };


  /*
    This useEffect is for fetching all the events and JOINED events/volunteers/events_data data
  */
  useEffect(() => {
    const setData = async () => {
      await fetchEvents().then(data => setEventsData(data));
      await fetchJoinedEvents().then(data => {
        const joinedContainers = data.map(event => {
          return <JoinedDataContainer data={event} key={event.volunteer_id} />;
        });
        setJoinedData(joinedContainers);
      });

    };
    setData();

  }, []);

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
  }, [input]);

  const buttonBackgroundColor = showCheckedIn ? 'grey' : 'defaultColor';
  const handleButtonClick = () => {
    setShowCheckedIn(!showCheckedIn);
  };

  return (
    <>
      <Box w="100%" h={10} bg="white" style={{boxShadow: ".1 .1 .1 .1"}} mb="1rem"></Box>
      <Button style={{ borderRadius: '60px', backgroundColor: `${showCheckedIn ?  '#EFEFEF' : '#696969'}`}} onClick={() => handleButtonClick()}>not checked-in</Button>
      <Button style={{ borderRadius: '60px', backgroundColor: `${showCheckedIn ?  '#696969' : '#EFEFEF'}`}} onClick={() => handleButtonClick()}>checked-in</Button>
      <Input value={input} onChange={event => setInput(event.target.value)} />

      {showCheckedIn && (volunteerResults.length != 0
        ? volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in == true).map(volunteer => (
            <EventCard eventData={volunteer.props.data} key={volunteer.props.data.volunteer_id} />
          ))
        : searchResults)}
      {!showCheckedIn && (volunteerResults.length != 0
      ? volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in == false).map(volunteer => (
          <EventCard eventData={volunteer.props.data} key={volunteer.props.data.volunteer_id} />
        ))
      : searchResults)}
    </>
  );
};

export default DummyCheckin;
