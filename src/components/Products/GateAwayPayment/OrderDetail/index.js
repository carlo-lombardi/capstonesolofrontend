import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import orderContext from "../../createContext";
import "./index.css";
export default function OrderDetails() {
  const customerOrderId = localStorage.getItem("customerOrderId");

  const [order, setOrder] = useState([]);
  const [orderLine, setOrderLine] = useState([]);
  console.log("qu es esto si no order", order);
  console.log("qu es esto si no orderLine", orderLine);
  useEffect(() => {
    fetchOrderLine(customerOrderId);
    fetchOrder(customerOrderId);
  }, []);

  // const totalOrder = useContext(orderContext);

  // console.log("que es esto", totalOrder);
  async function fetchOrderLine(customerOrderId) {
    await fetch(`orders/${customerOrderId}/orderLine`)
      .then((response) => response.json())
      .then((data) => {
        setOrderLine(data);
      });
  }

  async function fetchOrder(customerOrderId) {
    await fetch(`orders/${customerOrderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      });
  }
  return (
    <>
      <div className="container">
        <div className="row pick-at">
          <div>Pick-up at</div>
          <div>17:15</div>
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
            <strong>{order.subtotal}.00</strong>
          </div>
        </div>
        <div className="row customer-comment">
          <Form className="customer-comment-container-form">
            <Form.Label>Comment</Form.Label>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={4}
                value={order.comment}
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
            <strong>{order.totalPriceOfOrder}.00</strong>
          </div>
        </div>
      </div>
    </>
  );
}
