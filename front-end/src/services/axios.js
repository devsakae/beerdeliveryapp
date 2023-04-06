import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || PORT}`,
});

export const productById = async (t, id) => {
  const result = await api
    .get(`/products/sale/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const salesProductsById = async (t, id) => {
  const result = await api
    .get(`/sales_product/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};
