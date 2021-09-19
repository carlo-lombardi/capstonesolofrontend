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
  color: black;
  border-radius: 35px;
  border: 1px solid #d8d8d8;
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
  margin: 9px;
  padding: 2px;
  border-radius: 8px;
`;
export const ProductButton = styled.button`
  background-color: white;
  margin: 41px 0rem !important;
  padding: -1% !important;
  border-radius: -5px !important;
  border: none;
  -webkit-transition: 0.2 ease-out;
  -webkit-transition: 0.2 ease-out;
  transition: 0.2 ease-out;
`;
export const ProductBackToHome = styled(Link)`
  text-align: center;
  color: #fff;
  background-color: black;
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
  font-size: 15px;
`;
export const RestarurantStatus = styled.div`
  margin-left: 6px;
  padding: 0px 18px;
  border-radius: 10px;
  width: 40%;
  height: 25px;

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
  border-radius: 39px;
  align-self: center;
  background-color: #610404;
  padding: 15px 0;
  margin: 30px 50px;
  text-align: center;
  color: #fff;
  font-size: 16px;
`;
