import Backend from './utils';

const getEvents = async () => {
  const response = await Backend.get('/events');
  return response.data;
};

const getEventById = async id => {
  const response = await Backend.get(`/events/${id}`);
  return response.data;
}

const postEvent = async eventData => {
  const response = await Backend.post('/events', eventData);
  return response.data;
};

const putEvent = async eventData => {
  const response = await Backend.put(`/events/${eventData.id}`, eventData);
  return response.data;
};

export { getEvents, getEventById, postEvent, putEvent };
