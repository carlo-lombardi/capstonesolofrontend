import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  PickUpTimeTitle,
  ButtonCheckOut,
  PreviewMainContainer,
  PreviewContainer,
  ButtonOrderPickUp,
  ButtonOrderDelivery,
  ButtonContainer,
  PickUpContainer,
} from "./PreviewComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import RegisterOrSignIn from "../../RegisterModal";
import PickUp from "../PickUp";
import Delivery from "../Delivery";

const OrdersPreview = (newItemResponse) => {
  console.log("newItemResponse", newItemResponse);
  useEffect(() => {
    localStorage.setItem(
      "orderId",
      newItemResponse &&
        newItemResponse.newItemResponse &&
        newItemResponse.newItemResponse.orderId
        ? newItemResponse.newItemResponse.orderId
        : newItemResponse.newItemResponse
    );
  }, [newItemResponse]);
  const [displayer, setDisplayer] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const ShowingThePickUpTimer = (e) => {
    e.preventDefault();
    setDisplayer(true);
    const pickUp = document.getElementById("pickUpButton");
    pickUp.style.backgroundColor = "black";
    const delivery = document.getElementById("deliveryButton");
    delivery.style.backgroundColor = "red";
  };
  const ShowingTheDeliveryTimer = (e) => {
    e.preventDefault();
    setDisplayer(false);
    const pickUp = document.getElementById("pickUpButton");
    pickUp.style.backgroundColor = "red";
    const delivery = document.getElementById("deliveryButton");
    delivery.style.backgroundColor = "black";
  };

  return (
    <PreviewMainContainer className="container-fluid">
      <div className="row way-selected">
        <ButtonContainer className="col-lg-6">
          <ButtonOrderPickUp
            id="pickUpButton"
            onClick={(e) => ShowingThePickUpTimer(e)}
          >
            PickUp
          </ButtonOrderPickUp>
        </ButtonContainer>
        <ButtonContainer className="col-lg-6">
          <ButtonOrderDelivery
            id="deliveryButton"
            onClick={(e) => ShowingTheDeliveryTimer(e)}
          >
            Delivery
          </ButtonOrderDelivery>
        </ButtonContainer>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {displayer == true ? (
            <PickUp
              orderInfo={
                newItemResponse &&
                newItemResponse.newItemResponse &&
                newItemResponse.newItemResponse.orderId
                  ? newItemResponse.newItemResponse
                  : { newItemResponse: { orderId: -1 } }
              }
            />
          ) : (
            <Delivery
              orderInfo={
                newItemResponse &&
                newItemResponse.newItemResponse &&
                newItemResponse.newItemResponse.orderId
                  ? newItemResponse.newItemResponse
                  : { newItemResponse: { orderId: -1 } }
              }
            />
          )}
        </div>
      </div>
      <div className="row-">
        <div className="col-lg-12">
          <ButtonContainer>
            <ButtonCheckOut onClick={() => setModalShow(true)}>
              {" "}
              <h6>Proceed to checkout</h6>
            </ButtonCheckOut>
            <RegisterOrSignIn
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </ButtonContainer>
        </div>
      </div>
    </PreviewMainContainer>
  );
};

export default OrdersPreview;
