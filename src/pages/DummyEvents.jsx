import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Button,
  Stack,
  StackDivider,
  Card,
  CardBody,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import Backend from '../../utils/utils';

const DummyEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [eventId, setEventId] = useState('');
  const [showEvents, setShowEvents] = useState(false);

  const [formData, setFormData] = useState({ name: '', description: '', location: '' });

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events');
      // console.log('poop poop');
      console.log(eventsData.data);
      setEvents(eventsData.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const getEventId = async () => {
    try {
      const eventIdData = await Backend.get(`/events/${eventId}`);
      console.log(eventIdData);
      setSelectEvent(eventIdData.data);
      console.log(events);
    } catch (err) {
      console.log(`Error getting event ${eventId}: `, err.message);
    }
  };

  const deleteEvents = async id => {
    try {
      await Backend.delete(`/events/${id}`);
      getEvents();
    } catch (err) {
      console.log(`Error deleting event: ${id}`, err.message);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name == 'eventid') {
      // console.log(name);
      // console.log(value);
      setEventId(value);
      getEvents();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('FORM DATA: ', formData);
    try {
      await Backend.post('/events', formData);
      console.log('Submitted');
      setFormData({ name: '', description: '', location: '' });
      getEvents();
    } catch (e) {
      console.log('Error posting', e);
    }
  };

  const showEvent = () => {
    setShowEvents(true);
    if (eventId) {
      getEventId();
    }
  };

  const eventCards = (
    <Stack divider={<StackDivider />} spacing="4">
      {selectEvent ? (
        <Card key={selectEvent.id}>
          <CardBody>
            <Stack spacing={4}>
              <Text>Event ID: {selectEvent.id}</Text>
              <Text>Name: {selectEvent.name}</Text>
              <Text>Description: {selectEvent.description}</Text>
              <Text>Location: {selectEvent.location}</Text>
              <Button
                marginRight={'auto'}
                colorScheme="red"
                onClick={() => deleteEvents(selectEvent.id)}
              >
                Delete
              </Button>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        events.map(element => (
          <Card key={element.id}>
            <CardBody>
              <Stack spacing={4}>
                <Text>Event ID: {element.id}</Text>
                <Text>Name: {element.name}</Text>
                <Text>Description: {element.description}</Text>
                <Text>Location: {element.location}</Text>
                <Button
                  marginRight={'auto'}
                  colorScheme="red"
                  onClick={() => deleteEvents(element.id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))
      )}
    </Stack>
  );

  useEffect(() => {
    getEvents();
    // getEventId(eventId);
  }, []);

  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" onChange={handleInputChange} value={formData.name} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" marginTop={4}>
          Submit
        </Button>
      </form>
      <Stack align="center" marginTop={10} marginBottom={10} flexDirection={'row'} spacing={4}>
        <FormControl>
          <Input
            width={'auto'}
            id="eventid"
            name="eventid"
            onChange={handleInputChange}
            // value={eventId}
          />
        </FormControl>
        <Button size="md" colorScheme="linkedin" onClick={showEvent}>
          Show Events
        </Button>
      </Stack>
      {showEvents ? eventCards : null}
    </ChakraProvider>
  );
};

export default DummyEvents;
