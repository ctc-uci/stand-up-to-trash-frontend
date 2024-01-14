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
  const [showEvents, setShowEvents] = useState(false);

  const [formData, setFormData] = useState({ name: '', description: '', location: '' });

  const getEvents = async () => {
    const eventsData = await Backend.get('/events');
    console.log('poop poop');
    console.log(eventsData.data);
    setEvents(eventsData.data);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('FORM DATA: ', formData);
    try {
      await Backend.post('/events', formData);
      console.log('Submitted');
      setFormData({ name: '', description: '', location: '' });
    } catch (e) {
      console.log('Error posting', e);
    }
  };
  
  const showEvent = () => {
    setShowEvents(true);
  };

  const eventCards = (
    <Stack divider={<StackDivider />} spacing="4">
      {events.map(element => (
        <Card key={element.id}>
          <CardBody>
            <Stack direction={'row'} spacing={100}>
              <Text>ID: {element.id}</Text>
              <Button colorScheme="red">Delete</Button>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );

  useEffect(() => {
    getEvents();
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
      <Stack align="center" marginTop={10} marginBottom={10}>
        <Button size="md" colorScheme="linkedin" onClick={showEvent}>
          Show Events
        </Button>
      </Stack>
      {showEvents ? eventCards : null}
    </ChakraProvider>
  );
};

export default DummyEvents;
