import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import '../Components/Products.css';
import cartContext from '../Context/CartContext';

function Products() {
  const history = useHistory();

  const {
    total,
    cart,
    fetchProducts,
  } = useContext(cartContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ total === 0 }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { new Intl.NumberFormat('pt-br', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(total) }
        </span>
      </button>
      <div className="allCards">
        { cart?.map((prod, idx) => (<ProductCard key={ idx } prod={ prod } />)) }
      </div>
    </>
  );
}

export default Products;
