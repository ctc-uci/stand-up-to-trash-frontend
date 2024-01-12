import Backend from './utils.js';

const fetchEvents = async () => {
  const data = await Backend.get('/events');
  return data.data;
};

const fetchJoinedEvents = async () => {
  const data = await Backend.get('/events/joined');
  return data.data;
};

export { fetchEvents, fetchJoinedEvents };
