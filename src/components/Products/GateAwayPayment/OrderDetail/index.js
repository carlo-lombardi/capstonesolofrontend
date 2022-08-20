import React, { useContext, useEffect, useState } from "react";
import CompletedOrderContext from "../createContextToParents";
import { Form } from "react-bootstrap";
import "./index.css";

export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const customerOrderId = localStorage.getItem("orderId");
  const [orderLine, setOrderLine] = useState([]);
  // const [stimateResponse, setStimateResponse] = useState(
  //   JSON.parse(localStorage.getItem("stimateResponse"))
  // );
  //   setStimateResponse(JSON.parse(localStorage.getItem("stimateResponse")));
  //   if (stimateResponse != null) setOrder(stimateResponse.order);

  // console.log("que es esto", totalOrder);
  async function fetchOrderLine(customerOrderId) {
    await fetch(`orders/${customerOrderId}/orderLine`)
      .then((response) => response.json())
      .then((data) => {
        setOrderLine(data);
      });
  }

  const totalFullOrder = useContext(CompletedOrderContext);
  console.log("Existe ?", totalFullOrder);
  useEffect(() => {
    fetchOrderLine(customerOrderId);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row pick-at">
          <div>{totalFullOrder?.order?.orderType}</div>
          <div>
            <strong>{totalFullOrder?.order?.orderTime}</strong>
          </div>
        </div>
        {!orderLine ? (
          <div></div>
        ) : (
          orderLine.map((element, idx) => {
            return (
              <>
                <div className="item-single-displayed" key={idx}>
                  <div>
                    <strong>{element.quantity}.</strong>
                    <strong>{element.itemName}</strong>
                  </div>
                  <div>
                    <strong>{element.totalPriceOfOrderLine}.00</strong>
                  </div>
                </div>
                <div className="perItemDescrip">per item</div>
                <div className="quantityDescrip">
                  <strong>{element.quantity}</strong>
                </div>
                <br className="br-separeter" />
              </>
            );
          })
        )}
        <div className="row subtotal-line">
          <div>
            <strong>Subtotal</strong>
          </div>
          <div>
            <strong>{totalFullOrder?.order?.subtotal}.00</strong>
          </div>
        </div>
        <div className="row subtotal-line">
          <div>
            <strong>Delivery charge</strong>
          </div>
          <div>
            <strong>{totalFullOrder?.order?.deliveryfee}</strong>
          </div>
        </div>
        <div className="row customer-comment">
          <Form className="customer-comment-container-form">
            <Form.Label>Comment</Form.Label>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={4}
                value={totalFullOrder?.order?.comment}
                className="query-customer-area"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="row total-details">
          <div>
            <strong>Total</strong>
          </div>
          <div>
            <strong>{totalFullOrder?.order?.totalPriceOfOrder}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
