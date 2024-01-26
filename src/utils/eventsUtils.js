import Backend from './utils';

const getEvents = async () => {
  const response = await Backend.get('/events');
  return response.data;
};

export { getEvents };
