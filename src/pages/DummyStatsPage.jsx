import { Box, Button, Card, CardBody, HStack, Heading, Select, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Backend from '../utils/utils';

const DummyStatsPage = () => {
  return (
    <>
      <AllStats />
      <StatsByEvent />
      <StatsByProfile />
    </>
  );
};

const AllStats = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    getStatsData().then(data => setStats(data));
  }, []);
  return (
    <Box m="8">
      <Heading>All trash</Heading>
      <VolunteerTrashCollectedCard title="Total Trash Collected" amount={stats} />
    </Box>
  );
};

const StatsByEvent = () => {
  const [stats, setStats] = useState(null);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const select = useRef(null);
  useEffect(() => {
    getEvents().then(data => setEvents(data));
  }, []);

  return (
    <Box m="8">
      <Heading>Trash by event</Heading>
      <HStack mt="2">
        <Select placeholder="Select an event" ref={select}>
          {events.map(event => (
            <option value={event.id} key={event.id}>
              {event.name}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => {
            setSelectedEvent(
              events.filter(event => `${event.id}` === `${select.current.value}`)[0],
            );
            getEventStats(select.current.value).then(data => {
              setStats(data);
            });
          }}
        >
          View Data
        </Button>
      </HStack>
      {!selectedEvent ? (
        <Text mt="4">Select an event to view data</Text>
      ) : (
        <VolunteerTrashCollectedCard title={selectedEvent.name} amount={stats} />
      )}
    </Box>
  );
};

const StatsByProfile = () => {
  const [stats, setStats] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const select = useRef(null);
  useEffect(() => {
    getProfiles().then(data => setProfiles(data));
  }, []);

  return (
    <Box m="8">
      <Heading>Trash by profile</Heading>
      <HStack mt="2">
        <Select placeholder="Select a profile" ref={select}>
          {profiles.map(profile => (
            <option value={profile.id} key={profile.id}>
              {profile.first_name} (ID:{profile.id})
            </option>
          ))}
        </Select>
        <Button
          onClick={() => {
            setSelectedProfile(profiles.filter(profile => profile.id === select.current.value)[0]);
            getVolunteerStats(select.current.value).then(data => {
              setStats(data);
            });
          }}
        >
          View Data
        </Button>
      </HStack>
      {!selectedProfile ? (
        <Text mt="4">Select a profile to view data</Text>
      ) : (
        <VolunteerTrashCollectedCard title={selectedProfile.first_name} amount={stats} />
      )}
    </Box>
  );
};

const VolunteerTrashCollectedCard = ({ title, amount }) => {
  return (
    <Card my="4">
      <CardBody>
        <Text>
          {title}
          <br />
          <br />
          total trash:
          <br />
          {amount} pounds
        </Text>
      </CardBody>
    </Card>
  );
};

VolunteerTrashCollectedCard.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string,
};

const getStatsData = async dataId => {
  const resp = await Backend.get(dataId ? `/stats/${dataId}` : '/stats');
  return resp.data;
};

const getEventStats = async dataId => {
  const resp = await Backend.get(`/stats/event/${dataId}`);
  return resp.data;
};

const getVolunteerStats = async dataId => {
  const resp = await Backend.get(`/stats/volunteer/${dataId}`);
  return resp.data;
};

const getEvents = async () => {
  const resp = await Backend.get('/events');
  console.log(resp.data);
  return resp.data;
};

const getProfiles = async () => {
  const resp = await Backend.get('/profiles');
  return resp.data;
};

export default DummyStatsPage;
