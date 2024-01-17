/* eslint-disable  no-unused-vars */
import Backend from '../utils/utils';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Text,
  SimpleGrid,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react';

const VolunteerCard = ({ volunteer, onDelete }) => (
  <Card key={volunteer.id}>
    <CardHeader>
      <Heading size="md">{volunteer.id}</Heading>
    </CardHeader>
    <CardBody>
      <Text> Volunteer ID: {volunteer.volunteer_id}</Text>
      <Text> Number of People in Party: {volunteer.number_in_party}</Text>
      <Text>
        {' '}
        Collected: {volunteer.pounds} lbs | {volunteer.ounces} oz
      </Text>
      <Text> Unusual Items: {volunteer.unusual_items}</Text>
      <Text> Event: {volunteer.event_id}</Text>
      <Text> Checked In: {volunteer.is_checked_in ? 'Yes' : 'No'}</Text>
    </CardBody>
    <CardFooter>
      <Button onClick={() => onDelete(volunteer.id)}>Delete</Button>
    </CardFooter>
  </Card>
);

VolunteerCard.propTypes = {
  volunteer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    volunteer_id: PropTypes.string.isRequired,
    number_in_party: PropTypes.number.isRequired,
    pounds: PropTypes.number.isRequired,
    ounces: PropTypes.number.isRequired,
    unusual_items: PropTypes.string.isRequired,
    event_id: PropTypes.string.isRequired,
    is_checked_in: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const DummyVolunteerData = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [volunteer_id, setVolunteerId] = useState([]);
  const [number_in_party, setNumberInParty] = useState([]);
  const [pounds, setPounds] = useState([]);
  const [ounces, setOunces] = useState([]);
  const [unusual_items, setUnusualItems] = useState([]);
  const [event_id, setEventId] = useState([]);

  const getVolunteerData = async () => {
    try {
      const { data } = await Backend.get('/data');
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteer data:', error.message);
    }
  };

  const postVolunteerData = async (
    volunteer_id,
    number_in_party,
    pounds,
    ounces,
    unusual_items,
    event_id,
  ) => {
    try {
      const postData = {
        volunteer_id: volunteer_id,
        number_in_party: number_in_party,
        pounds: pounds,
        ounces: ounces,
        unusual_items: unusual_items,
        event_id: event_id,
        is_checked_in: false,
      };

      const { postStatus } = await Backend.post('/data', postData);
      getVolunteerData();
    } catch (error) {
      console.error('Error creating new volunteer:', error.message);
    }
  };

  const deleteVolunteerData = async id => {
    try {
      await Backend.delete(`/data/${id}`);
      // After deletion, refresh the volunteer data
      getVolunteerData();
    } catch (error) {
      console.error('Error deleting volunteer data:', error.message);
    }
  };

  const renderVolunteerCards = () => {
    return (
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {volunteers.map(volunteer => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} onDelete={deleteVolunteerData} />
        ))}
      </SimpleGrid>
    );
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <>
      <Button onClick={() => setShowCards(!showCards)}>
        {showCards ? 'Hide Volunteers' : 'Show Volunteers'}
      </Button>
      {showCards && renderVolunteerCards()}

      <form
        onSubmit={() =>
          postVolunteerData(volunteer_id, number_in_party, pounds, ounces, unusual_items, event_id)
        }
      >
        <FormControl>
          <FormLabel>Add New Volunteer</FormLabel>
          <Input
            type="string"
            value={volunteer_id}
            placeholder="Volunteer ID"
            onChange={e => setVolunteerId(e.target.value)}
          />
          <Input
            type="number"
            value={number_in_party}
            placeholder="Number of People in Party"
            onChange={e => setNumberInParty(e.target.value)}
          />
          <Input
            type="number"
            value={pounds}
            placeholder="Pounds Collected"
            onChange={e => setPounds(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Ounces Collected"
            onChange={e => setOunces(e.target.value)}
          />
          <Input
            type="string"
            value={unusual_items}
            placeholder="Unusual Items"
            onChange={e => setUnusualItems(e.target.value)}
          />
          <Input
            type="string"
            value={event_id}
            placeholder="Event ID"
            onChange={e => setEventId(e.target.value)}
          />
        </FormControl>
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default DummyVolunteerData;
