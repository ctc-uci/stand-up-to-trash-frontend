import { Box, Card, Text, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Backend from '../../utils/utils.js';

const LeaderboardCard = () => {
  const [topThree, setTopThree] = useState([]);
  const [events, setEvents] = useState([]);
  const [topThreeSpecificEvent, setEventSelect] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(-1);

  const getEvents = async () => {
    try {
      const events = await Backend.get('/events');
      setEvents(events.data);
    } catch (err) {
      console.log(`Error getting top three volunteers: `, err.message);
    }
  };

  const getTopThree = async () => {
    try {
      const topThreeData = await Backend.get('/stats/leaderboard');
      setTopThree(topThreeData.data);
    } catch (err) {
      console.log(`Error getting top three volunteers: `, err.message);
    }
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const handleChange = event => {
    setSelectedEvent(event.target.value);
    console.log(selectedEvent);
  };

  const SelectEvent = () => {
    return (
      <>
        <Select placeholder="Select Event" onChange={e => handleChange(e)}>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </Select>
      </>
    );
  };

  const getTopThreeSpecificEvent = async eventID => {
    try {
      const topThreeSpecificEvent = await Backend.get(`/stats/leaderboard/${eventID}`);
      setEventSelect(topThreeSpecificEvent.data);
    } catch (err) {
      console.log(`Error getting top three volunteers: `, err.message);
    }
  };

  const ActualLeaderboard = ({ LeaderboardArray }) => {
    return (
      <>
        <Box
          width="331px"
          height="195px"
          mx="13px"
          my="19px"
          display="flex"
          flexDir="column"
          alignContent="center"
          justifyContent="center"
          gap="9px"
          h="100%"
        >
          <Text fontWeight="bold" decoration="underline" textAlign="center">
            top 3 volunteers
          </Text>
          <Box mx="23px" bgColor="#2D558A" color="white" borderRadius="60px" padding="2px">
            <Text fontWeight="bold" color="white" textAlign="center">
              {LeaderboardArray[0] && LeaderboardArray[0].volunteer_first_name}{' '}
              {LeaderboardArray[0] && LeaderboardArray[0].volunteer_last_name} ...........{' '}
              {LeaderboardArray[0] && truncate(LeaderboardArray[0].total_weight, 2)} lbs
            </Text>
          </Box>
          <Text fontWeight="bold" textAlign="center">
            {LeaderboardArray[1] && LeaderboardArray[1].volunteer_first_name}{' '}
            {LeaderboardArray[1] && LeaderboardArray[1].volunteer_last_name} ............{' '}
            {LeaderboardArray[1] && truncate(LeaderboardArray[1].total_weight, 2)} lbs
          </Text>
          <Text fontWeight="bold" textAlign="center">
            {LeaderboardArray[2] && LeaderboardArray[2].volunteer_first_name}{' '}
            {LeaderboardArray[2] && LeaderboardArray[2].volunteer_last_name} ...........{' '}
            {LeaderboardArray[2] && truncate(LeaderboardArray[2].total_weight, 2)} lbs
          </Text>
        </Box>
      </>
    );
  };

  ActualLeaderboard.propTypes = {
    LeaderboardArray: PropTypes.array.isRequired,
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getTopThree();
  }, []);

  useEffect(() => {
    getTopThreeSpecificEvent(selectedEvent);
  }, [selectedEvent]);

  return (
    <>
      <Card borderRadius="0px 15px 15px 0px">
        <SelectEvent />
        {selectedEvent === -1 ? (
          <ActualLeaderboard LeaderboardArray={topThree} />
        ) : (
          <ActualLeaderboard LeaderboardArray={topThreeSpecificEvent} />
        )}
      </Card>
    </>
  );
};

export default LeaderboardCard;
