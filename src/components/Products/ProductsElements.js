import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoArrowBackOutline, IoBicycle, IoStorefront } from "react-icons/io5";

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
  padding: -1px 10px 0px 10px;
`;
export const ProductsHeading = styled.h4`
  margin: 0;
  color: #ffffff;
  flex: 1;
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
  margin: 41px 0rem;
  padding: -1%;
  border-radius: -5px;
  border: none;
  color: white;
  background-color: #610404;
  -webkit-transition: 0.2 ease-out;
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
export const ProductBackToHome = styled(Link)`
  text-align: center;
  color: #fff;
  background-color: #570404;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const ProductArrow = styled(IoArrowBackOutline)`
  color: #fff;
  font-size: 20px;
`;
export const RestarurantStatus = styled.div`
  margin-left: 10px;
  padding: 3px 8px;
  border-radius: 15px;

  &.status-on {
    color: #fff;
    background-color: #029875;
  }
  &.status-off {
    color: #fff;
    background-color: #bd4242;
  }
`;
export const IconTakeAway = styled(IoStorefront)`
  color: #fff;
  font-size: 20px;
  padding-left: 5px;
`;
export const IconDelivery = styled(IoBicycle)`
  color: #fff;
  font-size: 20px;
  padding-left: 5px;
`;
export const ProductPromo = styled.div`
  align-self: center;
  background-color: #610404;
  padding: 15px 0;
  margin: 10px 50px;
  text-align: center;
  color: #fff;
  font-size: 16px;
`;
