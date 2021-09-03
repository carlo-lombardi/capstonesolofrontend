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

const OrdersPreview = (newItemResponse) => {
  const [displayer, setDisplayer] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  console.log("este es", newItemResponse);
  /* function changeable(newItemResponse) {
    if (newItemResponse) {
      return console.log(newItemResponse);
    } else {
      return console.log("aun no");
    }
  } */
  const ShowingThePickUpTimer = () => {
    setDisplayer(true);
  };
  const ShowingTheDeliveryTimer = () => {
    setDisplayer(false);
  };

  const PickUp = (newItemsResponsed) => {
    console.log("funciona?", newItemsResponsed[0]);
    // changeable();
    /*     useEffect(() => {
      fetch(`/items/`)
        .then((response) => response.json())
        .then((data) => setUpdateItems(data));
    }, []); */
    return (
      <PickUpContainer className="col-lg-12">
        <div className="row">
          <PickUpTimeTitle className="col-lg-12">Pick-Up Time</PickUpTimeTitle>
          <div className="col-lg-12">a</div>
        </div>
      </PickUpContainer>
    );
  };
  const Delivery = () => {
    return (
      <PickUpContainer className="col-lg-12">
        <h6>Delivery Time</h6>
      </PickUpContainer>
    );
  };

  return (
    <PreviewMainContainer className="container-fluid">
      <div className="row">
        <ButtonContainer className="col-lg-6">
          <ButtonOrderPickUp onClick={ShowingThePickUpTimer}>
            PickUp
          </ButtonOrderPickUp>
        </ButtonContainer>
        <ButtonContainer className="col-lg-6">
          <ButtonOrderDelivery onClick={ShowingTheDeliveryTimer}>
            Delivery
          </ButtonOrderDelivery>
        </ButtonContainer>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {displayer == true ? (
            <PickUp responsesUpdated={newItemResponse} />
          ) : (
            <Delivery />
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
