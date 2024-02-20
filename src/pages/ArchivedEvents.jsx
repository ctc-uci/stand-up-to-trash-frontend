import { Heading, Grid, Center, GridItem } from '@chakra-ui/react';
import Backend from '../utils/utils';
import { useEffect, useState } from 'react';
import EventCard from '../components/DummyEvents/EventCard';

const ArchivedEvents = () => {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events/archiveEvents');
      setEvents(eventsData.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const eventCards = (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {events.map(element => (
        <GridItem key={element.id}>
          <EventCard
            {...element}
            // isSelected={selectedEvents.includes(element.id)}
            // showSelect={showSelect}
            // handleCheckboxChange={handleCheckboxChange}
          />
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <>
      <Center>
        <Heading marginBottom={10}> ARCHIVED EVENT</Heading>
      </Center>
      {eventCards}
    </>
  );
};

export default ArchivedEvents;
