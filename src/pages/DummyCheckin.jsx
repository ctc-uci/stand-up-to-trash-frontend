/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Select, Input } from '@chakra-ui/react';
import { fetchEvents, fetchJoinedEvents } from '../utils/fuseUtils';
import {
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
// import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import JoinedDataContainer from '../components/DummySearchVolunteerEvents/JoinedDataContainer';

const DummyCheckin = () => {
  const [eventsData, setEventsData] = useState([]);
  const [joinedData, setJoinedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');

  const EventCard = (data) => (
    <Card key={data.id}>
      <CardHeader>
        <Heading size="md">{data.id}</Heading>
      </CardHeader>
      <CardBody>
        <Text> Checked In: {data.is_checked_in ? 'Yes' : 'No'}</Text>
      </CardBody>
    </Card>
  );

  // const renderVolunteerCards = () => {
  //   return (
  //     <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
  //       {volunteers.map(volunteer => (
  //         <EventCard key={volunteer.id} volunteer={volunteer} />
  //       ))}
  //     </SimpleGrid>
  //   );
  // };

// debug
useEffect(() => {
  console.log(`volunteer results!!!${volunteerResults} with ${volunteerResults.length} entries`);
}, [volunteerResults]);

// useEffect(() => {
//   console.log(`searchres!!!${searchResults}`);
// }, [searchResults]);

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
      {/* {volunteerResults.length != 0 && <EventCard eventData={volunteerResults[0]} />} */}

      <Input value={input} onChange={event => setInput(event.target.value)} />
      {volunteerResults.length != 0 ? volunteerResults.map(volunteer =>
        <EventCard eventData={volunteer} key={volunteer.id}/>
    ) : searchResults}
    </>
  );
};

export default DummyCheckin;
