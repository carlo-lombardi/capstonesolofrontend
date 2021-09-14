import React, { useEffect, useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import { OrderPost } from "../../../middleware/OrderManagement";
import { initialize } from "./googleApi";
import "./index.css";

export default function Delivery(orderInfo) {
  const [comment, setCommentValue] = useState("");
  const [wholeProduct, setWholeProduct] = useState([]);
  const [searchEngine, setSearchEngine] = useState("");
  const [timeForDelivery, setTimeForDelivery] = useState("");
  console.log(timeForDelivery);
  const pickUpTime = [
    {
      name: "Pick Up at",
      time: "12:15",
    },
    {
      name: "Pick Up at",
      time: "12:30",
    },
    {
      name: "Pick Up at",
      time: "12:45",
    },
    {
      name: "Pick Up at",
      time: "13:00",
    },
  ];
  useEffect(async () => {
    const dataResult = await OrderPost({
      _id: orderInfo.orderInfo.orderId,
      orderType: "Delivery",
    });
    setWholeProduct(dataResult);
    setCommentValue(dataResult.order.comment);
  }, [setCommentValue]);

  const SetComment = async (e) => {
    e.preventDefault();
    setCommentValue(e.currentTarget.value);
    await OrderPost({
      comment: e.currentTarget.value,
    });
  };
  function handleSearchEngine(e) {
    e.preventDefault();
    initialize(searchEngine);
  }
  function handleSelect(e) {
    console.log(e);
    // setValue(e);
  }
  return (
    <div className="container">
      <div className="row pick-at">
        <DropdownButton
          title="Pick-up at"
          id="dropdown-item-button"
          className="container-button"
          onSelect={handleSelect}
        >
          {pickUpTime.map((e, idx) => {
            return (
              <>
                <Dropdown.Item
                  className="inside-button-time"
                  key={idx}
                  eventKey={e.time}
                >
                  {e.time}
                </Dropdown.Item>
              </>
            );
          })}
        </DropdownButton>
      </div>
      <div className="row item-selected">
        <form onKeyUp={(e) => handleSearchEngine(e)}>
          <input
            id="searchTextField"
            type="text"
            size="45"
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.currentTarget.value)}
            placeholder="Anything you want!"
          />
          <div id="filedGeoCode"></div>
        </form>
      </div>
      <div className="row item-selected">
        {wholeProduct && wholeProduct.lines && wholeProduct.lines.length > 0 ? (
          wholeProduct.lines.map((element, idx) => {
            return (
              <>
                <div className="item-single-displayed" key={idx}>
                  <div>
                    <strong>{element.quantity}.</strong>
                    <strong>{element.itemName}</strong>
                    <strong>{element.description}</strong>
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
        ) : (
          <h5 className="basketEmptyText">Your basket is empty</h5>
        )}
      </div>
      <div className="row subtotal-line">
        <div>
          <strong>Subtotal</strong>
        </div>
        <div>
          {console.log("sera?", wholeProduct)}
          {wholeProduct && wholeProduct.order && wholeProduct.order.subtotal ? (
            <strong>{wholeProduct.order.subtotal}.00</strong>
          ) : (
            <div>
              <strong>0.00</strong>
            </div>
          )}
        </div>
      </div>
      <div className="row customer-comment">
        <Form className="customer-comment-container-form">
          <Form.Label>
            <strong>Comment</strong>
          </Form.Label>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              value={comment}
              className="query-customer-area"
              onChange={async (e) => await SetComment(e)}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="row total-details">
        {wholeProduct &&
        wholeProduct.order &&
        wholeProduct.order.totalPriceOfOrder ? (
          <>
            <div>
              <strong>Total</strong>
            </div>
            <div>
              <strong>{wholeProduct.order.totalPriceOfOrder}.00</strong>
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Total</strong>
            </div>
            <div>
              <strong>0.00</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
