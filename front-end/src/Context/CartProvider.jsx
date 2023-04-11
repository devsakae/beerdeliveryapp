import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorage';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [total, setTotal] = useState(0);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const pegaCarrinho = useCallback((cartBackup) => {
    const myLocalCart = getFromLocalStorage('fazo4_cart') || cartBackup;
    setCart(myLocalCart);
  }, []);

  const fetchProducts = useCallback(async () => {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    const initCart = data.map((p) => ({ quantity: 0, item: { ...p } }));
    setMenu(initCart);
    pegaCarrinho(initCart);
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
