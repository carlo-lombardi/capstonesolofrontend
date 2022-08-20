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
  const orderId = localStorage.getItem("orderId");
  useEffect(() => {
    let looping = true;
    const interval = setInterval(async () => {
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const customerOrderId = JSON.parse(localStorage.getItem("stimateResponse"));
  async function cabifyOrderResponse() {
    if (orderId) {
      localStorage.setItem("customerOrderId", orderId);
      //localStorage.removeItem("orderId");
    }
    const stimateResponse = JSON.parse(localStorage.getItem("stimateResponse"));
    const response = await fetch(`/orders/createJourney`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: stimateResponse.deliveryProductId,
      }),
    });

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
      <div id="accepted" className="row  d-none">
        <div className="col-lg-12 logo-cabify">
          <img src={deliveryDriver} />
        </div>
        <div className="col-lg-12 mt-2 summary-order">
          <h4>Your order has been confirmed!</h4>
          <div className="row mt-3">
            <div className="col-12">
              <h5>Hi Carlo,</h5>
            </div>
          </div>
          <div className="row mt-3 border-bottom border-dark">
            <div className="col-3">
              <div>Order Date</div>
              <strong>
                <div>
                  {new Date(
                    orderSummaryResponse?.data?.createJourney?.startAt
                  ).toLocaleString()}
                </div>
              </strong>
            </div>
            <div className="col-3">
              <div>Order Number</div>
              <strong>
                <div>{orderSummaryResponse?.data?.createJourney?.id}</div>
              </strong>
            </div>
            <div className="col-3">
              <div>Payment</div>
              <strong>
                <div> Online </div>
              </strong>
            </div>
            <div className="col-3">
              <div>Address</div>
              <strong>
                <div>82 woodlawn park avenue, Dublin 24</div>
              </strong>
            </div>
          </div>
          <div className="row mt-3 border-bottom border-dark">
            <div className="col-9">
              <strong>Subtotal</strong>
            </div>
            <div className="col-3">
              <strong>{}</strong>
            </div>
          </div>
          <div className="row mt-3 border-bottom border-dark">
            <div className="col-9">
              <strong>Shipping</strong>
            </div>
            <div className="col-3">
              <strong> 2.50 </strong>
            </div>
          </div>
          <div className="row mt-3 border-bottom border-dark">
            <div className="col-9">
              <strong>Total</strong>
            </div>
            <div className="col-3">
              <strong>
                {customerOrderId?.order?.order?.totalPriceOfOrder}
              </strong>
            </div>
          </div>
          <div className="row mt-3 ">
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
      <div id="refused" className="row d-none">
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
