import EventCard from '../components/EventCardTest/EventCard';
import { useEffect, useState } from 'react';
import { getEvents } from '../utils/eventsUtils';
import { SimpleGrid } from '@chakra-ui/react';

const EventCardTest = () => {
    const [events, setEvents] = useState([]);
    // Array of all events from DB
    const [isAdmin, setAdminStatus] = useState([]);
    // Bool, if user is admin or not

    const loadData = async () => {
        await getEvents().then(data => setEvents(data));
        setAdminStatus(true);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
                {events.map(event => <EventCard event={event} isAdmin={isAdmin} key={event.id}/>)}    
            </SimpleGrid>
        </>
    );
};

export default EventCardTest;
