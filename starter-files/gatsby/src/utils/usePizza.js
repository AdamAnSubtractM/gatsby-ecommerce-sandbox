import { useState } from 'react';

export default function usePizza({ pizza, inputs }) {
  // State to hold order
  const [order, setOrder] = useState([]);
  // add to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // remove from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // send to serverless function TODO
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
