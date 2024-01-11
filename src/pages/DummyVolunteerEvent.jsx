import Backend from '../../utils/utils';
import { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

const DummyVolunteerEvent = () => {
  const [volunteerId, setVolunteerId] = useState('');
  const [volunteerResult, setVolunteerResult] = useState(null);

  const [eventId, setEventId] = useState('');
  const [eventResult, setEventResult] = useState(null);

  const [volunteerEventResult, setVolunteerEventResult] = useState(null);

  async function getVolunteerId(id){
    try{
      const response = await Backend.get(`/data/volunteer/${id}`);
      var stringList = ['volunteer id not found'];
      if(response.data.rows[0] != null){
        stringList = Object.keys(response.data.rows[0]).map(key => `${key}: ${response.data.rows[0][key]}`);
      }
      setVolunteerResult(stringList);
      return stringList;
    }
    catch(err){
      console.log(err);
    }
  }

  async function getEventId(id){
    try{
      const response = await Backend.get(`/data/event/${id}`);
      var stringList = ['event id not found'];
      if(response.data.rows[0] != null){
        stringList = Object.keys(response.data.rows[0]).map(key => `${key}: ${response.data.rows[0][key]}`);
      }
      setEventResult(stringList);
      return stringList;
    }
    catch(err){
      console.log(err);
    }
  }

  async function getVolunteerEventId(volunteerId, eventId){
    try{
      const response = await Backend.get(`/data/volunteer/${volunteerId}/event/${eventId}`);
      var stringList = ['volunteer or event id not found'];
      if(response.data.rows[0] != null){
        stringList = Object.keys(response.data.rows[0]).map(key => `${key}: ${response.data.rows[0][key]}`);
      }
      setVolunteerEventResult(stringList);
      return stringList;
    }
    catch(err){
      console.log(err);
    }
  }


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
    getVolunteerEventId(volunteerId, eventId)
  };

  return(
    <>
      <VStack align="center" spacing={4}>
        <p>Placeholder for the volunteer event page</p>
        <Input placeholder='Input Volunteer Id' value={volunteerId} onChange={(event) => {
          setVolunteerId(event.target.value);
        }}/>
        <Button onClick={handleVolunteerSubmit}>Submit</Button>

        {volunteerResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Details:</Text>
            {volunteerResult.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </Box>
        )}
      </VStack>

      <VStack align="center" spacing={4}>
        <Input placeholder='Input Event Id' value={eventId} onChange={(event) => {
          setEventId(event.target.value);
        }}/>
        <Button onClick={handleEventSubmit}>Submit</Button>

        {eventResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Details:</Text>
            {eventResult.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </Box>
        )}
      </VStack>

      <VStack align="center" spacing={4}>
        <Input placeholder='Input Volunteeer Id' value={volunteerId} onChange={(event) => {
          setVolunteerId(event.target.value);
        }}/>
        <Input placeholder='Input Event Id' value={eventId} onChange={(event) => {
          setEventId(event.target.value);
        }}/>
        <Button onClick={handleVolunteerEventSubmit}>Submit</Button>

        {volunteerEventResult && (
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Details:</Text>
            {volunteerEventResult.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </Box>
        )}
      </VStack>
    </>
  )
};

export default DummyVolunteerEvent;
