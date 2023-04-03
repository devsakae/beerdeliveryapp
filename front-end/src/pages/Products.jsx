import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3001/customer/products');
      const data = await response.json();
      const initCart = data.map((p) => ({ quantity: 0, item: { ...p } }));
      setProducts(data);
      setCart(initCart);
    }

    fetchProducts();
  }, []);

  const addItem = (prod) => {
    const prodIndex = cart.find((item) => item.id === prod.id);
    const newCart = [...cart];
    if (prodIndex) {
      newCart[prodIndex].quantity += 1;
      setCart(newCart);
    }
    newCart.push({ quantity: 1, item: prod });
    setCart(newCart);
  };

  const removeItem = () => {

  };

  // const handleQuantityChange = ({ target }) => {
  //   setQuantity(target.value);
  // };

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
          { `Ver Carrinho: R$ ${total}` }
        </span>
      </button>
      <div>
        {
          products.map((prod) => (
            <div key={ prod.id }>
              <p
                data-testid={ `customer_products__element-card-price-${prod.id}` }
              >
                { new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                  .format(parseFloat(prod.price)) }
              </p>
              <img
                src={ prod.urlImage }
                alt={ `Imagem do produto${prod.name}` }
                data-testid={ `customer_products__img-card-bg-image-${prod.id}` }
                width="90"
                height="100"
              />
              <div>
                <p
                  data-testid={ `customer_products__element-card-title-${prod.id}` }
                >
                  { prod.name }
                </p>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${prod.id}` }
                  onClick={ removeItem }
                >
                  -
                </button>
                <input
                  type="text"
                  value={ quantity }
                  data-testid={ `customer_products__input-card-quantity-${prod.id}` }
                  disabled
                />
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-add-item-${prod.id}` }
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
