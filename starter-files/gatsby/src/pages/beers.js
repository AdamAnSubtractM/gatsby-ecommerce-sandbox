import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const StyledBeerGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StyledSingleBeer = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    margin: auto;
  }
`;

export default function BeersPage({ data }) {
  const beersTotal = data.beers.nodes.length;
  return (
    <>
      <SEO title={`Beers. We have ${beersTotal} available.`} />
      <h2 className="center">
        We have {beersTotal} beers Available! Dine in Only!
      </h2>
      <StyledBeerGrid>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <StyledSingleBeer key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`🌟`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`🌟`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </StyledSingleBeer>
          );
        })}
      </StyledBeerGrid>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
