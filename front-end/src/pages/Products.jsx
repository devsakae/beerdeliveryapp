import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

function Products() {
  // const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3001/customer/products');
      const data = await response.json();
      const initCart = data.map((p) => ({ quantity: 0, item: { ...p } }));
      // setProducts(data);
      setCart(initCart);
    }

    fetchProducts();
  }, []);

  // const updateTotal = () => {

  // };

  const addItem = (prod) => {
    const prodIndex = cart.findIndex(({ item }) => item.id === prod.item.id);
    const newCart = [...cart];
    // console.log('prodIndex: ', prodIndex);
    newCart[prodIndex].quantity += 1;
    setCart(newCart);
    const newAmount = +newCart[prodIndex].item.price;
    setTotal(total + newAmount);
  };

  const removeItem = () => {

  };

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="customer_products__button-cart"
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { `Ver Carrinho: R$ ${total.toFixed(2)}` }
        </span>
      </button>
      <div>
        {
          cart.map((prod) => (
            <div key={ prod.item.id }>
              <p
                data-testid={ `customer_products__element-card-price-${prod.item.id}` }
              >
                { new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                  .format(prod.item.price) }
              </p>
              <img
                src={ prod.item.urlImage }
                alt={ `Imagem do produto${prod.item.name}` }
                data-testid={ `customer_products__img-card-bg-image-${prod.item.id}` }
                width="90"
                height="100"
              />
              <div>
                <p
                  data-testid={ `customer_products__element-card-title-${prod.item.id}` }
                >
                  { prod.name }
                </p>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${prod.item.id}` }
                  onClick={ removeItem }
                >
                  -
                </button>
                <input
                  type="number"
                  value={ prod.quantity }
                  data-testid={ `customer_products__input-card-quantity-${prod.item.id}` }
                  onChange={ handleQuantityChange }
                />
                <button
                  type="button"
                  data-testid={
                    `customer_products__button-card-add-item-${prod.item.id}`
                  }
                  onClick={ () => addItem(prod) }
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Products;
