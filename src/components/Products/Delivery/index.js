import React, { useContext, useEffect, useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import { OrderPost, SetOrderInfo } from "../../../middleware/OrderManagement";
// import initialize from "../../GoogleMapAddress/index.js";
import "./index.css";
import orderContext from "../createContext";
// function pickuptimeConstructor()
// {
//   const today = new Date();
//   const currentTime = today.getHours();
//   startHour =
// };

export default function Delivery() {
  const [comment, setCommentValue] = useState("");
  const [wholeProduct, setWholeProduct] = useState([]);
  const [timeInfo, setTimeInfo] = useState();
  const pickUpTime = [
    {
      time: "15:45:00",
    },
    {
      time: "16:45:00",
    },
    {
      time: "17:45:00",
    },
    {
      time: "18:45:00",
    },
    {
      time: "19:45:00",
    },
    {
      time: "20:45:00",
    },
    {
      time: "21:45:00",
    },
    {
      time: "22:45:00",
    },
  ];
  const totalOrder = useContext(orderContext);

  useEffect(() => {
    setWholeProduct(totalOrder.newItemResponse);
  }, [totalOrder]);

  /*   console.log(
    "woi",
    wholeProduct,
    wholeProduct?.order,
    wholeProduct?.order?._id
  ); */
  useEffect(async () => {
    if (!timeInfo || timeInfo == "Delivery Time") return;
    /*     const payload = {
      _id: wholeProduct?.order?._id,
      orderType: "Delivery",
      orderTime: timeInfo,
    }; */

    // if (timeInfo) payload.orderTime = timeInfo;
    // console.log("llega aqui???????", payload);
    await SetOrderInfo({
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
      {/*       <div className="row item-selected">
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
      </div> */}
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
              onBlur={async (e) => {
                setCommentValue(e.currentTarget.value);
                await SetOrderInfo({
                  comment: e.currentTarget.value,
                });
              }}
              // onChange={async (e) => await SetComment(e)}
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
  );
}
