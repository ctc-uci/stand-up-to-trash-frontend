import Backend from './utils';

const postEventData = async eventData => {
  const response = await Backend.post('/data', eventData);
  return response.data;
};

export { postEventData };
