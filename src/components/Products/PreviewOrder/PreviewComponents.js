import styled from "styled-components";

export const PreviewMainContainer = styled.div`
  height: 50%;
  width: 100%;
`;

export const PreviewContainer = styled.div`
  border: 2px solid blue;
  height: 50%;
  max-height: 100%;
  width: 100%;
`;
export const ButtonContainer = styled.div`
  height: 100%;
  padding: 30px 0px 30px 0px;
  border-radius: 30px 0px 0px 30px;
`;
export const ButtonOrderPickUp = styled.button`
  border-radius: 30px 0px 0px 30px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: red;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
`;
export const ButtonOrderDelivery = styled.button`
  border-radius: 0px 30px 30px 0px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: red;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
`;
export const PickUpContainer = styled.div`
  border: 1px solid darkgray;
  height: 100px;
`;
export const PickUpTimeTitle = styled.div`
  border: 1px solid darkgray;
`;
export const ButtonCheckOut = styled.button`
  margin-bottom: 15px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: red;
  color: white;
  &:hover {
    background-color: black;
    transition: ease-in-out;
  }
`;
