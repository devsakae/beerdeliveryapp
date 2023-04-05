import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { productById, salesProductsById } from '../services/axios';
import MyContext from './SellerDetailsContext';
import { getFromLocalStorage } from '../services/localStorage';

function SellerDetailsProvider({ children }) {
  const [salesProduct, setSalesProduct] = useState([]);
  const [productsById, setProductsById] = useState([]);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const { token } = getFromLocalStorage('user');
    setUserToken(token);
    try {
      const request = async () => {
        const salesProductId = await salesProductsById(userToken, id);
        setSalesProduct(salesProductId);
        const productId = await productById(userToken, id);
        setProductsById(productId);
      }; request();
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  // const getSellerDetailsById = async (t, id) => {
  //   const salesProductId = await salesProductsById(t, id);
  //   const products = await productById(t, id);
  //   setSalesProduct(salesProductId);
  //   setProductsById(products);
  // };

  const contextValue = useMemo(() => ({
    salesProduct,
    productsById,
    userToken,
  }), [
    salesProduct,
    productsById,
    userToken,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

SellerDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SellerDetailsProvider;
