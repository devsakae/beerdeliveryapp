import React, { useEffect } from 'react';
import CustomerOrderDetailRow from '../Components/CustomerOrderDetailRow';
import Header from '../Components/Header';

const { useParams } = require('react-router-dom');

function CustomerOrderDetail() {
  const { id } = useParams();
  // const [order, setOrder] = useState({});
  // const [orderItems, setOrderItems] = useState([]);

  const prefix = 'customer_order_details_';

  const orderItems = [ // mock
    {
      // Seller
      seller: 'Vendedor 1',

      // Sale
      id: 1,
      saleDate: '12/12/24',
      status: 'Entregue',
      total: 20,

      // sale_product -> Product
      name: 'Item 1',
      price: 10,
      quantity: 2,
      subtotal: 20,
    },
  ];

  useEffect(() => {
    // const fetchOrder = async () => {
    //   const order = await getOrder(id);
    //   setOrder(order);
    //   setOrderItems(order.orderItems);
    // };
    // fetchOrder();
  }, [id]);

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-id` }
            >
              { orderItems[0].id }
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-seller-name` }
            >
              { orderItems[0].seller }
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-date` }
            >
              { orderItems[0].saleDate }
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-delivery-status${id}` }
            >
              { orderItems[0].status }
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        data-testid={ `${prefix}_button-delivery-check` }
      >
        Marcar como entregue
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((orderItem, index) => CustomerOrderDetailRow(orderItem, index))}
        </tbody>
      </table>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { orderItems[0].total }
      </span>
    </div>
  );
}

export default CustomerOrderDetail;
