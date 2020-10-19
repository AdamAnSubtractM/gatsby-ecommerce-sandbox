/* eslint-disable jsx-a11y/label-has-associated-control */
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import StyledOrders from '../styles/OrderStyles';
import StyledMenuItem from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title="Order a Pizza" />
      <StyledOrders>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas &&
            pizzas.map((pizza) => (
              <StyledMenuItem key={pizza.id}>
                <Img
                  width="50"
                  height="100"
                  fluid={pizza.image.asset.fluid}
                  alt={pizza.name}
                />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      type="button"
                      key={`size-${size}`}
                      onClick={() => addToOrder({ id: pizza.id, size })}
                    >
                      {size} -{' '}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </StyledMenuItem>
            ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
      </StyledOrders>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
