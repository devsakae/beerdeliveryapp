import React, { useContext, useEffect } from 'react';
import BuyButton from '../Components/BuyButton';
import Layout from '../Components/Layout';
import ProductCard from '../Components/ProductCard';
import '../Components/Products.css';
import cartContext from '../Context/CartContext';

function Products() {
  const { cart, fetchProducts } = useContext(cartContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Layout>
      <h2>Nossos produtos</h2>
      <div className="floating">
        <BuyButton />
      </div>
      <div className="allCards">
        { cart?.map((prod, idx) => (<ProductCard key={ idx } prod={ prod } />)) }
      </div>
    </Layout>
  );
}

export default Products;
