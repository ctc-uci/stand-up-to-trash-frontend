import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Divider, Center } from '@chakra-ui/react';
import EventCard from '../components/EventCardTest/EventCard';
import { getEvents } from '../utils/eventsUtils';

const FilteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setAdminStatus] = useState(false); // Assuming boolean value for admin status
  const [pastEvents, setPastEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  const loadData = async () => {
    const data = await getEvents();
    setEvents(data);
    setAdminStatus(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const setData = async () => {
      const currentDate = new Date();
      const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
      const todayDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

      const past = [];
      const future = [];
      const current = [];

      events.forEach(event => {
        const eventDate = new Intl.DateTimeFormat('en-US', options).format(new Date(event.date));

        // Parse date strings to actual Date objects for proper comparison
        const today = new Date(todayDate);
        const eventDateTime = new Date(eventDate);

        if (eventDateTime < today) {
          past.push(event);
        } else if (eventDateTime > today) {
          future.push(event);
        } else {
          current.push(event);
        }
      });

      setPastEvents(past);
      setFutureEvents(future);
      setCurrentEvents(current);
    };

    setData();
  }, [events]);

  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <Center bg="white" px="4">
          Past Events
        </Center>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {pastEvents.map(event => (
            <EventCard event={event} isAdmin={isAdmin} key={event.id} />
          ))}
        </SimpleGrid>
        <Divider />
        <Center bg="white" px="4">
          Current Events
        </Center>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {currentEvents.map(event => (
            <EventCard event={event} isAdmin={isAdmin} key={event.id} />
          ))}
        </SimpleGrid>
        <Divider />
        <Center bg="white" px="4">
          Future Events
        </Center>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {futureEvents.map(event => (
            <EventCard event={event} isAdmin={isAdmin} key={event.id} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default FilteredEvents;
