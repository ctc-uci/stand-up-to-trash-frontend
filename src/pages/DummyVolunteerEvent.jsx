import Backend from '../../utils/utils';
import { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

const DummyVolunteerEvent = () => {
  const [volunteerId, setVolunteerId] = useState('');
  const [volunteerResult, setVolunteerResult] = useState(null);

  const [eventId, setEventId] = useState('');
  const [eventResult, setEventResult] = useState(null);

  const [VolunteerEventIdOne, setVolunteerEventIdOne] = useState('');
  const [VolunteerEventIdTwo, setVolunteerEventIdTwo] = useState('');
  const [volunteerEventResult, setVolunteerEventResult] = useState(null);

  const getVolunteerId = async id => {
    try {
      console.log(id);
      const response = await Backend.get(`/data/volunteer/${id}`);
      setVolunteerResult(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log('vol:', volunteerResult);

  const getEventId = async id => {
    try {
      const response = await Backend.get(`/data/event/${id}`);
      setEventResult(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVolunteerEventId = async (VolunteerEventIdOne, VolunteerEventIdTwo) => {
    try {
      const response = await Backend.get(
        `/data/volunteer/${VolunteerEventIdOne}/event/${VolunteerEventIdTwo}`,
      );
      setVolunteerEventResult(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVolunteerSubmit = () => {
    setVolunteerResult(null); // Reset the result state
    getVolunteerId(volunteerId);
  };

  const handleEventSubmit = () => {
    setEventResult(null); // Reset the result state
    getEventId(eventId);
  };

  const handleVolunteerEventSubmit = () => {
    setVolunteerEventResult(null); // Reset the result state
    getVolunteerEventId(VolunteerEventIdOne, VolunteerEventIdTwo);
  };

  return (
    <>
      <VStack align="center" spacing={4}>
        <Text>Placeholder for the volunteer event page</Text>
        <Input
          placeholder="Input Volunteer Id"
          value={volunteerId}
          onChange={event => {
            setVolunteerId(event.target.value);
          }}
        />
        <Button onClick={handleVolunteerSubmit}>Submit</Button>

        {volunteerResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">
              Details:
            </Text>
            {volunteerResult.map(item =>
              Object.keys(item).map((key, index) => (
                <Text key={index}>{`${key}: ${item[key]}`}</Text>
              )),
            )}
          </Box>
        )}
      </VStack>

      <VStack align="center" spacing={4}>
        <Input
          placeholder="Input Event Id"
          value={eventId}
          onChange={event => {
            setEventId(event.target.value);
          }}
        />
        <Button onClick={handleEventSubmit}>Submit</Button>

        {eventResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">
              Details:
            </Text>
            {eventResult.map(item =>
              Object.keys(item).map((key, index) => (
                <Text key={index}>{`${key}: ${item[key]}`}</Text>
              )),
            )}
          </Box>
        )}
      </VStack>

      <VStack align="center" spacing={4}>
        <Input
          placeholder="Input Volunteeer Id"
          value={VolunteerEventIdOne}
          onChange={event => {
            setVolunteerEventIdOne(event.target.value);
          }}
        />
        <Input
          placeholder="Input Event Id"
          value={VolunteerEventIdTwo}
          onChange={event => {
            setVolunteerEventIdTwo(event.target.value);
          }}
        />
        <Button onClick={handleVolunteerEventSubmit}>Submit</Button>

        {volunteerEventResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">
              Details:
            </Text>
            {volunteerEventResult.map(item =>
              Object.keys(item).map((key, index) => (
                <Text key={index}>{`${key}: ${item[key]}`}</Text>
              )),
            )}
          </Box>
        )}
      </VStack>
    </>
  );
};

export default DummyVolunteerEvent;
