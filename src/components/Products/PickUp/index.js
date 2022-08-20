import React, { useContext, useEffect, useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import { IoVolumeHigh } from "react-icons/io5";
import { SetOrderInfo } from "../../../middleware/OrderManagement";
import orderContext from "../createContext";
import "./index.css";

export default function PickUp() {
  const [wholeProduct, setWholeProduct] = useState([]);
  const [comment, setCommentValue] = useState();
  const [timeInfo, setTimeInfo] = useState();
  const pickUpTime = [
    {
      time: "15:15:00",
    },
    {
      time: "15:30:00",
    },
    {
      time: "15:45:00",
    },
    {
      time: "16:00:00",
    },
    {
      time: "16:15:00",
    },
    {
      time: "16:30:00",
    },
    {
      time: "16:45:00",
    },
    {
      time: "17:00:00",
    },
    {
      time: "17:15:00",
    },
    {
      time: "17:30:00",
    },
    {
      time: "17:45:00",
    },
    {
      time: "18:00:00",
    },
  ];

  const totalOrder = useContext(orderContext);
  useEffect(async () => {
    setWholeProduct(totalOrder.newItemResponse);
  }, [totalOrder]);

  useEffect(async () => {
    if (timeInfo && timeInfo != "PickUp Time")
      SetOrderInfo({
        orderTime: timeInfo,
      });
  }, [timeInfo]);

  useEffect(async () => {
    const dataResponse = await setComment();
    setCommentValue(dataResponse?.order?.comment);
  }, []);

  async function setComment(e) {
    const dataResponse = await SetOrderInfo({
      _id: wholeProduct?.order?._id,
      comment: e?.target?.value,
    });
    setCommentValue(e?.target?.value);
    return await dataResponse;
  }

  async function SetTimeInfo(e) {
    e.preventDefault();
    setTimeInfo(e.target.innerText);
  }

  return (
    <form>
      <div className="container">
        <div className="row pick-at">
          <DropdownButton
            id="dropdown-item-button"
            className="container-button"
            // title="Pick-up at"
            title={timeInfo ? `${timeInfo}` : `At Time:`}
            onClick={(e) => {
              SetTimeInfo(e);
            }}
            // onSelect={async (e) => await SetTimeInfo(e)}
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
          {/* <div>{totalOrder.newItemResponse.itemName}</div> */}
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
                // onChange={async (e) => await SetComment(e)}
                // onBlur={(e) => setComment(e)}
                onBlur={(e) => {
                  setComment(e);
                  // await SetOrderInfo({
                  //   comment: e.currentTarget.value,
                  // });
                }}
                placeholder="Write for the chef"
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
