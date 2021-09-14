import styled from "styled-components";

export const PreviewMainContainer = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  z-index: 0;
  background-color: white;
  height: 50%;
  width: 78%;
  border: 1px solid #d8d8d8;
`;

export const PreviewContainer = styled.div`
  border: 2px solid blue;
  height: 50%;
  max-height: 100%;
  width: 100%;
`;
export const ButtonContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px 0px 30px 0px;
  border-radius: 30px 0px 0px 30px;
`;
export const ButtonOrderPickUp = styled.button`
  /* padding: 0 0 0 10%; */
  border-radius: 30px 0px 0px 30px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: black;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
  &:focus {
    background-color: black;
    color: white;
  }
`;
export const ButtonOrderDelivery = styled.button`
  border-radius: 0px 30px 30px 0px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: #570404;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
  &:focus {
    background-color: black;
    color: white;
  }
`;
export const PickUpContainer = styled.div`
  background-color: white;
  border: 1px solid darkgray;
  height: 400px;
`;
export const PickUpTimeTitle = styled.div`
  border: 1px solid darkgray;
`;
export const ButtonCheckOut = styled.button`
  margin-bottom: 15px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: #570404;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
`;
