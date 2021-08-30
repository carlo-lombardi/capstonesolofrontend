import styled from "styled-components";

export const ProductsContainer = styled.div`
  background: white;
  color: black;
`;

export const ProductWrapper = styled.div`
  margin: 0;
  padding: 0 1px 0 0;
`;

export const ProductCard = styled.div`
  border: 1px solid darkgray;
  display: flex;
  margin: 1rem 0rem;
  padding: -1px 10px 0px 10spx;
`;
export const ProductsHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const ProductInfo = styled.div`
  padding: 15px 0px;
`;

export const ProductTitle = styled.h2`
  font-weight: 400;
  font-size: 1.3rem;
`;

export const ProductDesc = styled.p`
  padding: 0;
  margin: 0;
`;

export const ProductPrice = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
`;
export const Counter = styled.span`
  border: 1px solid gray;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`;
export const ProductButton = styled.button`
  font-size: 1rem;
  margin: 35px 0rem;
  padding: 0rem 1rem;
  border: none;
  background-color: #eaeaea;
  color: black;
  transition: 0.2 ease-out;
  /*  &::before {
    content: "+";
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: courier;
    color: white;
  }
  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  } */
`;
