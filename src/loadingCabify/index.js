import React, { useEffect, useState } from "react";
import Loader from "./loader";
import "./index.css";
import { useHistory } from "react-router-dom";
import deliveryDriver from "../assest/driverDelivery.png";
import orderRefused from "../assest/orderRefused.png";

export default function CabifyOrder() {
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [orderSummaryResponse, setOrderSummaryResponse] = useState();
  console.log("esto es el order summary", orderSummaryResponse);
  console.log("esto es una consoles log the order", order);
  useEffect(() => {
    let looping = true;
    const interval = setInterval(async () => {
      const orderId = localStorage.getItem("orderId");
      if (orderId && looping) {
        const response = await fetch(`/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
        const loader = document.getElementById("loader");
        const accepted = document.getElementById("accepted");
        const refused = document.getElementById("refused");
        switch (data.orderState) {
          case "Accepted":
            accepted.className = "row";
            loader.className = "row d-none";
            refused.className = "row d-none";
            cabifyOrderResponse();
            looping = false;
            break;
          case "Refused":
            loader.className = "row d-none";
            accepted.className = "row d-none";
            refused.className = "row";
            break;
          default:
            loader.className = "row";
            accepted.className = "row d-none";
            refused.className = "row d-none";
            break;
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const orderId = localStorage.getItem("orderId");
  async function cabifyOrderResponse() {
    if (orderId) {
      localStorage.setItem("customerOrderId", orderId);
      localStorage.removeItem("orderId");
    }
    const customerOrderId = localStorage.getItem("customerOrderId");
    const response = await fetch(`/orders/${customerOrderId}`);
    const data = await response.json();
    setOrderSummaryResponse(data);
  }

  return (
    <div className="container loader-container">
      <div id="loader" className="row ">
        <div className="col ">
          <h2 className="title-loader">
            Waiting for the restaurant to accept the order
          </h2>
          <Loader />
        </div>
      </div>
      <div id="accepted" className="row  d-block">
        <div className="col-lg-12 logo-cabify">
          <img src={deliveryDriver} />
        </div>
        <div className="col-lg-12 mt-2 summary-order">
          <h4>Your Order Confirmed!</h4>
          <div className="row mt-3">
            <div className="col-12">
              <h5>Hi Carlo,</h5>
            </div>
            <div className="col-12">
              Your order sas been confirmed and will be shipping between 12:45 -
              12:55
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">Order Date</div>
            <div className="col-3">Order Number</div>
            <div className="col-3">Payment</div>
            <div className="col-3">Address</div>
          </div>
          <div className="row mt-3">
            <div className="col-9">Subtotal</div>
            <div className="col-3">$ 300.00</div>
          </div>
          <div className="row mt-3">
            <div className="col-9">Shipping</div>
            <div className="col-3">$ 3.00</div>
          </div>
          <div className="row mt-3">
            <div className="col-9">Fees</div>
            <div className="col-3">$ 0.30</div>
          </div>
          <div className="row mt-3">
            <div className="col-9">Total</div>
            <div className="col-3">$ 303.30</div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <strong>Thank You!</strong>
              <div>El Milagro</div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-9">
              Questions? Contact our <strong>Customer Support</strong>
            </div>
            <div className="col-3"> 2021 El Milagro </div>
          </div>
        </div>
      </div>
      <div id="refused" className="row d-block">
        <div className="col-lg-12 logo-cabify">
          <img src={orderRefused} />
        </div>
        <div className="col-lg-12 mt-5 summary-order">
          <h4> Sorry your order has been refused </h4>
          <div className="redirect-link">
            {" "}
            You will be redirect to the main page in 3s
          </div>
        </div>
      </div>
    </div>
  );
}
