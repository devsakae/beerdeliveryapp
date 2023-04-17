import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorage';
import CartContext from './CartContext';

const api = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function CartProvider({ children }) {
  const [total, setTotal] = useState(0);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const pegaCarrinho = useCallback((cartBackup) => {
    const myLocalCart = getFromLocalStorage('fazo4_cart') || cartBackup;
    setCart(myLocalCart);
  }, []);

  const formatPrice = useCallback((prod) => `R$ ${new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(prod)}`, []);

  const formatDate = useCallback((notFormattedDate) => {
    const date = new Date(notFormattedDate);
    return `${date.getDate()
      .toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString().padStart(2, '0')}/${date.getFullYear()}`;
  }, []);

  const fetchProducts = useCallback(async () => {
    axios.get(`${api}/products`, { mode: 'no-cors' })
      .then((response) => {
        const firstCart = response.data.map((p) => ({ quantity: 0, item: p }));
        setMenu(firstCart);
        pegaCarrinho(firstCart);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [pegaCarrinho]);

  useEffect(() => {
    if (cart.length > 0) {
      saveToLocalStorage('fazo4_cart', cart);
      const subtotal = cart.reduce((acc, curr) => {
        acc += (+curr.item.price * curr.quantity);
        return acc;
      }, 0);
      setTotal(subtotal);
    }
  }, [cart]);

  const increaseQuantity = useCallback((prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    newCart[prodIndex].quantity += 1;
    setCart(newCart);
  }, [cart]);

  const decreaseQuantity = useCallback((prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    if (newCart[prodIndex].quantity > 0) {
      newCart[prodIndex].quantity -= 1;
      setCart(newCart);
    }
  }, [cart]);

  const handleQuantityChange = useCallback((evt, prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    newCart[prodIndex].quantity = +evt.target.value;
    setCart(newCart);
  }, [cart]);

  const deleteItem = useCallback((id) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === id);
    const newCart = [...cart];
    newCart[prodIndex].quantity = 0;
    setCart(newCart);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    total,
    menu,
    fetchProducts,
    increaseQuantity,
    decreaseQuantity,
    handleQuantityChange,
    deleteItem,
    pegaCarrinho,
    formatPrice,
    formatDate,
  }), [
    cart,
    total,
    menu,
    fetchProducts,
    increaseQuantity,
    decreaseQuantity,
    handleQuantityChange,
    deleteItem,
    pegaCarrinho,
    formatPrice,
    formatDate,
  ]);

  return (
    <CartContext.Provider value={ value }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default CartProvider;
