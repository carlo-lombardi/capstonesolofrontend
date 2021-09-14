import React, { useEffect, useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import { OrderPost } from "../../../middleware/OrderManagement";
import "./index.css";

export default function PickUp(orderInfo) {
  const [comment, setCommentValue] = useState("");
  const [wholeProduct, setWholeProduct] = useState([]);
  console.log("wholeProduct pick-up", wholeProduct);

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
      orderType: "PickUp",
    });
    console.log("dataResult", dataResult);
    setWholeProduct(dataResult);
    setCommentValue(dataResult.order.comment);
  }, [orderInfo, setCommentValue]);

  const SetComment = async (e) => {
    e.preventDefault();
    setCommentValue(e.currentTarget.value);
    await OrderPost({
      _id: orderInfo.orderInfo.orderId,
      comment: e.currentTarget.value,
    });
  };

  return (
    <form>
      <div className="container">
        <div className="row pick-at">
          <DropdownButton
            id="dropdown-item-button"
            className="container-button"
            title="Pick-up at"
          >
            {pickUpTime.map((e, idx) => {
              return (
                <div key={idx}>
                  <Dropdown.Item className="inside-button-time" as="button">
                    {e.time}
                  </Dropdown.Item>
                </div>
              );
            })}
          </DropdownButton>
        </div>
        <div className="row item-selected">
          {wholeProduct &&
          wholeProduct.lines &&
          wholeProduct.lines.length > 0 ? (
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
            {wholeProduct &&
            wholeProduct.order &&
            wholeProduct.order.subtotal ? (
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
    </form>
  );
}
