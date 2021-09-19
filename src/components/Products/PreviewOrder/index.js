import React, { useEffect, useState } from "react";
// import { BsPlusCircle } from "react-icons/bs";
import {
  // PickUpTimeTitle,
  ButtonCheckOut,
  PreviewMainContainer,
  // PreviewContainer,
  ButtonOrderPickUp,
  ButtonOrderDelivery,
  ButtonContainer,
  // PickUpContainer,
} from "./PreviewComponents";
import "bootstrap/dist/css/bootstrap.min.css";
// import { NavLink } from "react-router-dom";
import RegisterOrSignIn from "../../RegisterModal";
import PickUp from "../PickUp";
import Delivery from "../Delivery";
import { SetOrderInfo } from "../../../middleware/OrderManagement";
import OrderContext from "../createContext";
const getOrderIdFromResponse = (orderResponse) => {
  return orderResponse &&
    orderResponse.orderResponse &&
    orderResponse.orderResponse.orderId
    ? orderResponse.orderResponse.orderId
    : -1;
};

const OrdersPreview = (orderResponse) => {
  console.log("Esto es el order preview", orderResponse);
  useEffect(() => {
    localStorage.setItem("orderId", getOrderIdFromResponse(orderResponse));
  }, [orderResponse]);
  const [displayer, setDisplayer] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const ShowingThePickUpTimer = () => {
    setDisplayer(true);
    const pickUp = document.getElementById("pickUpButton");
    pickUp.style.backgroundColor = "black";
    const delivery = document.getElementById("deliveryButton");
    delivery.style.backgroundColor = "red";
  };
  const ShowingTheDeliveryTimer = () => {
    setDisplayer(false);
    const pickUp = document.getElementById("pickUpButton");
    pickUp.style.backgroundColor = "red";
    const delivery = document.getElementById("deliveryButton");
    delivery.style.backgroundColor = "black";
  };

  return (
    <OrderContext.Provider value={{ ...orderResponse }}>
      <PreviewMainContainer className="container-fluid">
        <div className="row way-selected">
          <ButtonContainer className="col-lg-6">
            <ButtonOrderPickUp
              id="pickUpButton"
              onClick={async () => {
                ShowingThePickUpTimer();
                await SetOrderInfo({
                  type: "Pickup",
                });
              }}
            >
              PickUp
            </ButtonOrderPickUp>
          </ButtonContainer>
          <ButtonContainer className="col-lg-6">
            <ButtonOrderDelivery
              id="deliveryButton"
              onClick={async () => {
                ShowingTheDeliveryTimer();
                await SetOrderInfo({
                  type: "Delivery",
                });
              }}
            >
              Delivery
            </ButtonOrderDelivery>
          </ButtonContainer>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {displayer === true ? (
              <PickUp
              // orderInfo={
              //   getOrderIdFromResponse(orderResponse)
              //     ? orderResponse.orderResponse
              //     : { Order: { order: { _id: -1 } } }
              // }
              />
            ) : (
              <Delivery
              // orderInfo={
              //   getOrderIdFromResponse(orderResponse)
              //     ? orderResponse.orderResponse
              //     : { Order: { order: { _id: -1 } } }
              // }
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
    </OrderContext.Provider>
  );
};

export default OrdersPreview;
