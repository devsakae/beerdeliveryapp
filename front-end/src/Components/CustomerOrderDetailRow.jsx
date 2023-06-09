function CustomerOrderDetailRow(orderItem, index) {
  const { name, quantity, price, subtotal } = orderItem;

  return (
    <tr key={ `map-key-${index}` }>
      <td
        data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-unit-price-${index}` }
      >
        {String(Number(price).toFixed(2)).replace(/\./, ',')}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
      >
        {String(Number(subtotal).toFixed(2)).replace(/\./, ',')}
      </td>
    </tr>
  );
}

export default CustomerOrderDetailRow;
