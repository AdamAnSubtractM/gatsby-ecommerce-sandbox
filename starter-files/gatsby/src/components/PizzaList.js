import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const StyledPizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 500px;
  gap: 4rem;
`;

const StyledPizza = styled.div`
  display: grid;
  /** Take your row sizing not from the pizza styles div, but from StyledPizzaGrid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <StyledPizza>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </StyledPizza>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <StyledPizzaGrid>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </StyledPizzaGrid>
  );
}
