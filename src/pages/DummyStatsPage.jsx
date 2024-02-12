import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  VStack,
  Heading,
  Select,
  Text,
} from '@chakra-ui/react';

import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Backend from '../utils/utils';

const DummyStatsPage = () => {
  return (
    <>
      <AllData />
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

const AllData = () => {
  const [allInformation, setAllInformation] = useState('');
  const [isWeekToggled, setIsWeekToggled] = useState(true);
  const [isMonthToggled, setIsMonthToggled] = useState(false);
  const [isYearToggled, setIsYearToggled] = useState(false);
  const [participantInformation, setParticipantInformation] = useState('');

  const weekButton = () => {
    if (isMonthToggled) setIsMonthToggled(!isMonthToggled);
    if (isYearToggled) setIsYearToggled(!isYearToggled);

    weeklyTrashData().then(data => {
      setAllInformation(data ? data : 0);
    });
    weeklyParticipantsData().then(data => {
      setParticipantInformation(data ? data : 0);
    });
    setIsWeekToggled(!isWeekToggled);
  };

  const monthButton = () => {
    if (isWeekToggled) setIsWeekToggled(!isWeekToggled);
    if (isYearToggled) setIsYearToggled(!isYearToggled);
    monthlyTrashData().then(data => {
      setAllInformation(data ? data : 0);
    });
    monthlyParticipantsData().then(data => {
      setParticipantInformation(data ? data : 0);
    });
    setIsMonthToggled(!isMonthToggled);
  };
  const yearButton = () => {
    if (isWeekToggled) setIsWeekToggled(!isWeekToggled);
    if (isMonthToggled) setIsMonthToggled(!isMonthToggled);
    yearlyTrashData().then(data => {
      setAllInformation(data ? data : 0);
    });
    yearlyParticipantsData().then(data => {
      setParticipantInformation(data ? data : 0);
    });
    setIsYearToggled(!isYearToggled);
  };

  useEffect(() => {
    // Load week data when the component mounts
    weeklyTrashData().then(data => {
      setAllInformation(data ? data : 0);
    });

    weeklyParticipantsData().then(data => {
      setParticipantInformation(data ? data : 0);
    });
  }, []);

  return (
    <Card m="8">
      <CardBody>
        <VStack align="start" spacing={4}>
          <Heading>all data</Heading>
          <HStack>
            <Button
              borderRadius="full"
              width="100%"
              onClick={e => weekButton(e)}
              colorScheme={isWeekToggled ? 'teal' : 'gray'}
            >
              weekly
            </Button>
            <Button
              borderRadius="full"
              width="100%"
              onClick={monthButton}
              colorScheme={isMonthToggled ? 'teal' : 'gray'}
            >
              monthly
            </Button>
            <Button
              borderRadius="full"
              width="100%"
              onClick={yearButton}
              colorScheme={isYearToggled ? 'teal' : 'gray'}
            >
              yearly
            </Button>
          </HStack>
          <HStack>
            <Box
              width="100px"
              height="100px"
              backgroundColor="gray.200"
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Text as="b" fontSize="sm">
                total trash:
              </Text>
              <Text as="b" fontSize="sm">
                {arrowUpOrDown(allInformation)} + {allInformation}
              </Text>
            </Box>

            <Box
              width="100px"
              height="100px"
              backgroundColor="gray.200"
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Text as="b" fontSize="sm">
                participants:
              </Text>
              <Text as="b" fontSize="sm">
                {arrowUpOrDown(participantInformation)} + {participantInformation}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const arrowUpOrDown = num => {
  if (num[0] == '-') {
    return <ArrowDownIcon></ArrowDownIcon>;
  } else {
    return <ArrowUpIcon></ArrowUpIcon>;
  }
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
  // console.log(resp.data);
  return resp.data;
};

const getProfiles = async () => {
  const resp = await Backend.get('/profiles');
  return resp.data;
};

const weeklyTrashData = async () => {
  const resp = await Backend.get('/stats/week');
  // console.log(resp);
  return resp.data;
};

const monthlyTrashData = async () => {
  const resp = await Backend.get('/stats/month');
  // console.log(resp);
  return resp.data;
};

const yearlyTrashData = async () => {
  const resp = await Backend.get('/stats/year');
  // console.log(resp);
  return resp.data;
};

const weeklyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/week');
  return resp.data;
};

const monthlyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/week');
  // console.log(resp);
  return resp.data;
};

const yearlyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/year');
  // console.log(resp);
  return resp.data;
};

export default DummyStatsPage;
