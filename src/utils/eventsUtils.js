import Backend from './utils';

const getEvents = async () => {
  const response = await Backend.get('/events');
  return response.data;
};

const postEvent = async(eventData) => {
  const response = await Backend.post('/events', eventData)
  return response.data
}

export { getEvents, postEvent };
