import EventCard from '../components/EventCardTest/EventCard';
import { useEffect, useState } from 'react';
import { getEvents } from '../utils/eventsUtils';
import { SimpleGrid } from '@chakra-ui/react';

const FilteredEvents = () => {
  const [events, setEvents] = useState([]);
  // Array of all events from DB
  const [isAdmin, setAdminStatus] = useState([]);
  // Bool, if user is admin or not
  const [pastEvents, setPastEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  const loadData = async () => {
    await getEvents().then(data => setEvents(data));
    const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0, 200));
    let options = {
      timeZone: 'PST',
    };
    const dateTime = new Intl.DateTimeFormat(options).format(date);

    for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
      const event = events[eventIndex];

      //2024-02-18T08:00:00.000Z
      if (event.date < dateTime) {
        // Past event
        setPastEvents(pastEvents + event);
      } else if (event.date > dateTime) {
        // Future Event
        setFutureEvents(futureEvents + event);
      } else {
        // Current
        setCurrentEvents(currentEvents + event);
      }
    }

    setAdminStatus(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {events.map(event => (
          <EventCard event={event} isAdmin={isAdmin} key={event.id} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default FilteredEvents;
