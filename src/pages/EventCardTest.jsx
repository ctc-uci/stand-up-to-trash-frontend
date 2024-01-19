import EventCard from '../components/EventCardTest/EventCard';
import { useEffect, useState } from 'react';
import { getEvents } from '../utils/eventsUtils';
import { SimpleGrid } from '@chakra-ui/react';

const EventCardTest = () => {
    const [events, setEvents] = useState([]);
    // const [isAdmin, setAdminStatus] = useState([]);

    const loadEvents = async () => {
        await getEvents().then(data => setEvents(data));
    };

    // const adminStatus = () => {

    // };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <>
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
                {events.map(event => <EventCard event={event} key={event.id}/>)}    
            </SimpleGrid>
        </>
    );
}

export default EventCardTest;
// event-card-page
