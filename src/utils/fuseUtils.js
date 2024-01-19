import Backend from './utils.js';

/* 
  fetches all the events data
*/
const fetchEvents = async () => {
  const data = await Backend.get('/events');
  return data.data;
};

/*
    fetches joined data from all tables
*/
const fetchJoinedEvents = async () => {
  const data = await Backend.get('/events/joined');
  return data.data;
};

export { fetchEvents, fetchJoinedEvents };
