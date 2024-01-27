/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Select, Input } from '@chakra-ui/react';
import { fetchEvents, fetchJoinedEvents } from '../utils/fuseUtils';
import { Heading, Text, Card, CardHeader, CardBody, Checkbox, Flex } from '@chakra-ui/react';
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

  /*
    This asynchronous function updates the checkin status of an eventData entry, if its true it becomes false, if its false it becomes true
  */
  const changeIsCheckedIn = async eventData => {
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
        <CardHeader>
          <Heading size="md">{eventData.event_data_id}</Heading>
        </CardHeader>
        <CardBody>
          <Flex>
            <Text m={3}>{eventData.first_name}</Text>
            <Text m={3}>{eventData.name}</Text>
            <Checkbox
              onChange={() => changeIsCheckedIn(eventData)}
              isChecked={eventData.is_checked_in}
            >
              Checked In?
            </Checkbox>
          </Flex>
        </CardBody>
      </Card>
    );
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

  /*
    This is all the options for the dropdown, it's the name of all the events
  */
  const eventOptions = eventsData.map(event => (
    <option key={event.id} value={event.id}>
      {event.name}
    </option>
  ));

  /*
    This is the filtered data based on the user's selection
  */
  const filterHandler = event => {
    const filterdData = joinedData.filter(item => {
      if (item.props.data.event_id == event.target.value || event.target.value == -1) {
        return true;
      }
    });
    setSearchResults(filterdData);
  };

  return (
    <>
      <Select placeholder="Select Event" onChange={event => filterHandler(event)}>
        <option key={-1} value={-1}>
          All Events
        </option>
        {eventOptions}
      </Select>

      <Input value={input} onChange={event => setInput(event.target.value)} />
      {volunteerResults.length != 0
        ? volunteerResults.map(volunteer => (
            <EventCard eventData={volunteer.props.data} key={volunteer.props.data.volunteer_id} />
          ))
        : searchResults}
    </>
  );
};

export default DummyCheckin;
