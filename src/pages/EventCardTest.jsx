import EventCard from '../components/EventCardTest/EventCard';
import { useEffect, useState } from 'react';
import { getEvents } from '../utils/eventsUtils';

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
            {events.map(event => <EventCard event={event} key={event.id}/>)}
        </>
    );
}

export default EventCardTest;
// event-card-page
