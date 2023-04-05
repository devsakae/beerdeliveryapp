import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const increaseQuantity = useCallback((prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    newCart[prodIndex].quantity += 1;
    setCart(newCart);
    const newAmount = +newCart[prodIndex].item.price;
    setTotal(total + newAmount);
  }, [cart, total]);

  const decreaseQuantity = useCallback((prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    if (newCart[prodIndex].quantity > 0) {
      newCart[prodIndex].quantity -= 1;
      setCart(newCart);
      const newAmount = +newCart[prodIndex].item.price;
      setTotal(total - newAmount);
    }
  }, [cart, total]);

  const handleQuantityChange = useCallback((evt, prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    newCart[prodIndex].quantity = +evt.target.value;
    setCart(newCart);
    let newTotal = 0;
    for (let i = 0; i < newCart.length; i += 1) {
      newTotal += newCart[i].quantity * newCart[i].item.price;
    }
    setTotal(newTotal);
  }, [cart]);

  const fetchProducts = useCallback(async () => {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    const initCart = data.map((p) => ({ quantity: 0, item: { ...p } }));
    setCart(initCart);
  }, []);

  const deleteItem = useCallback((position) => {
    const newCart = [...cart];
    newCart.splice(position, 1);
    setCart(newCart);
    let newTotal = 0;
    for (let i = 0; i < newCart.length; i += 1) {
      newTotal += newCart[i].quantity * newCart[i].item.price;
    }
    setTotal(newTotal);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    total,
    fetchProducts,
    increaseQuantity,
    decreaseQuantity,
    handleQuantityChange,
    deleteItem,
  }), [
    cart,
    total,
    fetchProducts,
    increaseQuantity,
    decreaseQuantity,
    handleQuantityChange,
    deleteItem,
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
