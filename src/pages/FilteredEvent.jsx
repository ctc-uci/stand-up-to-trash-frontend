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
    await getEvents().then(data => setEvents(data));
    setAdminStatus(false);
};


  const setData = () => {
    const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0, 200));
    let options = {
        timeZone: "PST"
    };
    const dateTime = new Intl.DateTimeFormat(options).format(date);

    const past = [];
    const future = [];
    const current = [];

    events.forEach(event => {
    const eventDate = new Intl.DateTimeFormat(options).format(new Date(event.date));
    if (eventDate < dateTime) {
        past.push(event);
    } else if (eventDate > dateTime) {
        future.push(event);
    } else {
        current.push(event);
    }
    });

    setPastEvents(past);
    setFutureEvents(future);
    setCurrentEvents(current);
  };
 

  useEffect(() => {
    loadData();
    setData();
  }, [setData]);

  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <Center bg="white" px="4">Past Events</Center>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {pastEvents.map(event => (
            <EventCard event={event} isAdmin={isAdmin} key={event.id} />
          ))}
        </SimpleGrid>
        <Divider />
        <Center bg="white" px="4">Current Events</Center>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {currentEvents.map(event => (
            <EventCard event={event} isAdmin={isAdmin} key={event.id} />
          ))}
        </SimpleGrid>
        <Divider />
        <Center bg="white" px="4">Future Events</Center>
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
