import Backend from './utils';

const getProfile = async () => {
  const response = await Backend.get('/profiles');
  return response.data;
};

const postProfile = async profile => {
  const response = await Backend.post('/profiles', profile);
  return response.data;
};

const deleteProfile = async id => {
  const response = await Backend.delete(`/profiles/${id}`);
  return response.data;
};

const getProfileById = async id => {
  const response = await Backend.get(`/profiles/${id}`);
  return response.data;
};

export { getProfile, postProfile, deleteProfile, getProfileById };
