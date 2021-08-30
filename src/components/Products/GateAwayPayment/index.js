import React from "react";
import OrdersPreview from "../PreviewOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckOut.css";

const GateAwayPayment = () => {
  const Checkout = (props) => (
    <div className="checkout">
      <div className="checkout-container">
        <h3 className="heading-3">Your information</h3>
        <div className="row">
          <div className="col">
            <Input label="first_name" type="text" name="first_name" />
          </div>
          <div className="col">
            <Input label="last_name" type="text" name="last_name" />
          </div>
        </div>
        <Input label="email" type="text" name="email" />
        <Input label="phone_number" type="number" name="phone_number" />
        <h3 className="heading-3">Payment information</h3>
        <Input label="Cardholder's Name" type="text" name="name" />
        <Input label="Card Number" type="number" name="card_number" imgSrc="" />
        <div className="row">
          <div className="col">
            <Input label="Expiration Date" type="month" name="exp_date" />
          </div>
          <div className="col">
            <Input label="CVV" type="number" name="cvv" />
          </div>
        </div>
        <Button text="Finish the order" />
      </div>
    </div>
  );
  const Input = (props) => (
    <div className="input">
      <label>{props.label}</label>
      <div className="input-field">
        <input type={props.type} name={props.name} />
        <img src={props.imgSrc} />
      </div>
    </div>
  );

  const Button = (props) => (
    <button className="checkout-btn" type="button">
      {props.text}
    </button>
  );

  return (
    <div className="app-container">
      {/*       <div className="row justify-content-between">
        <div className="col-lg-12 ">
          <NavBar />
        </div>
      </div> */}
      <div className="row check_out_main_container">
        <div className="col-lg-8">
          <Checkout />
        </div>
        <div className="col-lg-4 order_preview">
          <OrdersPreview />
        </div>
        <div className="col-lg-6 order_preview_small">
          <Button>Preview</Button>
        </div>
      </div>
    </div>
  );
};
export default GateAwayPayment;
