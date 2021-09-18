import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./index.css";
export default function OrderDetails() {
  const orderId = localStorage.getItem("orderId");

  const [orderLine, setOrderLine] = useState([]);
  console.log(orderLine);
  useEffect(() => {
    fetchOrderLine(orderId);
  }, []);

  async function fetchOrderLine(orderId) {
    await fetch(`orders/${orderId}/orderLine`)
      .then((response) => response.json())
      .then((data) => {
        setOrderLine(data);
      });
  }
  return (
    <>
      <div className="container">
        <div className="row pick-at">
          <div>Pick-up at</div>
          <div>17:15</div>
        </div>
        {orderLine.map((element, idx) => {
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
              {/*         <div className="row subtotal-line">
          <div>
            <strong>Subtotal</strong>
          </div>
          <div>
            <strong>{orderLine.subtotal}.00</strong>
          </div>
        </div>
        <div className="row customer-comment">
          <Form className="customer-comment-container-form">
            <Form.Label>Comment</Form.Label>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={4}
                className="query-customer-area"
              />
            </Form.Group>
          </Form>
        </div> */}
            </>
          );
        })}
        <div className="row total-details">
          <div>
            <strong>Total</strong>
          </div>
          <div>
            <strong>15.00</strong>
          </div>
        </div>
      </div>
    </>
  );
}
