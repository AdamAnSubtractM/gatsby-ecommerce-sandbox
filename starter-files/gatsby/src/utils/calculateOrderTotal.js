import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  const total = order.reduce((runningTotal, singleOrderItem) => {
    const pizza = pizzas.find((zza) => zza.id === singleOrderItem.id);
    return (
      runningTotal + calculatePizzaPrice(pizza.price, singleOrderItem.size)
    );
  }, 0);
  // calc the total for that pizza
  // add that total to the running total
  return total;
}
