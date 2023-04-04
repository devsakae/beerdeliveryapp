import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || PORT}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRole = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};
