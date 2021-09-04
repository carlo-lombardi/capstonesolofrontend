import React from "react";
import { Form } from "react-bootstrap";
import "./index.css";
export default function OrderDetails() {
  return (
    <div className="container">
      <div className="row pick-at">
        <div>Pick-up at</div>
        <div>17:15</div>
      </div>
      <div className="row item-selected">
        <div>The item selected will be displayed here</div>
        <div>60.00</div>
        <div>The item selected will be displayed here</div>
        <div>90.00</div>
      </div>
      <div className="row subtotal-line">
        <div>Subtotal</div>
        <div>150.00</div>
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
      </div>
      <div className="row total-details">
        <div>Total</div>
        <div>150.50</div>
      </div>
    </div>
  );
}
