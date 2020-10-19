import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const StyledToppings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active,
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this an existing topping
      const exisitingTopping = acc[topping.id];
      if (exisitingTopping) {
        exisitingTopping.count += 1;
      } else {
        // if it is, increment by 1
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // 1. get list of all toppings
  // 2. get a list of all pizzas w/ their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // 3. count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(`toppingsWithCounts`, toppingsWithCounts);
  // 4. loop over the list of toppings and display the topping and the count of pizzas in that topping
  // 5. link it up
  return (
    <StyledToppings>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? `active` : ``}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </StyledToppings>
  );
}
