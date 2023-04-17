import React from 'react';

export default function AdminProductsList({ products, error }) {
  return (
    <section>
      <h2>Menu de produtos</h2>
      <div>
        { error && (<div>{ error }</div>) }
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome completo</th>
              <th>E-mail</th>
              <th>Posição</th>
            </tr>
          </thead>
          <tbody>
            { products?.map((product, i) => (<div key={ i }>{ product.name }</div>)) }
          </tbody>
        </table>
      </div>
    </section>
  );
}
