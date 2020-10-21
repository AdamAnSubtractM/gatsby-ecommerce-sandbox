import React from 'react';
import Img from 'gatsby-image';
import StyledMenuItem from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      <p>You have {order.length} in your order.</p>
      {order.map((singleOrderItem, i) => {
        const pizza = pizzas.find((zza) => zza.id === singleOrderItem.id);
        return (
          <StyledMenuItem key={`${singleOrderItem.id}${i}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <p>{pizza.name}</p>
            <p>
              {formatMoney(
                calculatePizzaPrice(pizza.price, singleOrderItem.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrderItem.size} ${pizza.name} from Order.`}
                onClick={() => removeFromOrder(i)}
              >
                &times;
              </button>
            </p>
          </StyledMenuItem>
        );
      })}
    </>
  );
}
