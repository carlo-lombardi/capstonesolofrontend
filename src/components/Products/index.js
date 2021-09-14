import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductsElements.css";
import {
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductInfo,
  ProductDesc,
  ProductButton,
  Counter,
  ProductBackToHome,
  ProductArrow,
  RestarurantStatus,
  IconTakeAway,
  IconDelivery,
  ProductPromo,
} from "./ProductsElements";
import OrdersPreview from "./PreviewOrder";
import MyVerticallyCenteredModal from "../Products/PopUpCard";

const Products = ({ heading, items }) => {
  const [modalShow, setModalShow] = useState(false);
  let [titleLabel, setTitleLabel] = useState("");
  const [responseOrderLine, setResponseOrderLine] = useState();

  const searchInput = "";
  async function Increasing(e, unitPrice) {
    return await fetch(`/orders/orderLine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: e,
        orderId: responseOrderLine ? responseOrderLine.orderId : null,
        totalPriceOfOrderLine: unitPrice,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  async function Decreasing(e) {
    return await fetch(`/orders/orderLine/${e}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  const hasExtras = (item, beforeQuantity) => {
    return (
      beforeQuantity == 0 &&
      item.isMain &&
      item.payload &&
      item.payload.quantity == 1 &&
      item.allowedItemTypes &&
      item.allowedItemTypes.length > 0
    );
  };

  return (
    <>
      <div className="lazy-gap"></div>
      <ProductBackToHome to="/" className="back-home-link">
        <ProductArrow />
        <span className="back-home-text">BACK TO HOME</span>
      </ProductBackToHome>
      <div className="black-background"></div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <div className="menu-page">
              <div className="menu-container">
                <div className="row delete-in-phones">
                  <div className="col-xs-6 col-lg-6">
                    <ProductsHeading>{heading}</ProductsHeading>
                    <p className="flex-1">
                      7-8, Finnstown Shopping Centre, Lucan, Co. Dublin
                    </p>
                  </div>
                  <div className="col-xs-6 col-lg-6">
                    <div className="flex-al-self">
                      <p>Open at 12:00</p>
                      <RestarurantStatus className="status-on">
                        OPEN
                      </RestarurantStatus>
                    </div>
                    <div className="flex-group end-column">
                      <p>Delivery available until 23:15</p>
                      <div>
                        15-25 min
                        <IconTakeAway />
                      </div>
                      <div>
                        45-55 min
                        <IconDelivery />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row go-down">
                  <input
                    type="text"
                    className="search"
                    value={searchInput}
                    placeholder="What do you feel like eating?"
                  />
                </div>
                <ProductPromo>Any Promotion will be added here</ProductPromo>
                <ProductWrapper>
                  {items.map((item, index) => {
                    if (item.itemType != titleLabel) {
                      return [
                        <h4>{(titleLabel = item.itemType)}</h4>,
                        <ProductCard key={index}>
                          <div className="col-lg-9">
                            <ProductInfo>
                              <ProductTitle>{item.name}</ProductTitle>
                              <ProductDesc>{item.description}</ProductDesc>
                              <ProductDesc>€ {item.unitPrice}</ProductDesc>
                            </ProductInfo>
                          </div>
                          <div className="col-lg-3 text-center">
                            <ProductButton
                              onClick={async (e) => {
                                const itemDeleted = (item.payload =
                                  await Decreasing(responseOrderLine._id));
                                setResponseOrderLine(itemDeleted);
                              }}
                            >
                              {" "}
                              -{" "}
                            </ProductButton>
                            {item.payload ? (
                              <Counter> {item.payload.quantity} </Counter>
                            ) : (
                              <Counter> {0} </Counter>
                            )}
                            <ProductButton
                              onClick={async (e) => {
                                const beforeQuantity = item.payload
                                  ? item.payload.quantity
                                  : 0;
                                let newItem = (item.payload = await Increasing(
                                  item._id,
                                  item.unitPrice
                                ));
                                setResponseOrderLine(newItem);
                                setModalShow(hasExtras(item, beforeQuantity));
                              }}
                            >
                              {" "}
                              +{" "}
                            </ProductButton>
                            <MyVerticallyCenteredModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                              items={items}
                            />
                          </div>
                        </ProductCard>,
                      ];
                    } else {
                      return [
                        <ProductCard key={index}>
                          <div className="col-lg-9">
                            <ProductInfo>
                              <ProductTitle>{item.name}</ProductTitle>
                              <ProductDesc>{item.description}</ProductDesc>
                              <ProductDesc>€ {item.unitPrice}</ProductDesc>
                            </ProductInfo>
                          </div>
                          <div className="col-lg-3 text-center">
                            <ProductButton
                              onClick={async (e) => {
                                let itemDeleted = (item.payload =
                                  await Decreasing(item._id));
                                setResponseOrderLine(itemDeleted);
                              }}
                            >
                              {" "}
                              -{" "}
                            </ProductButton>
                            {item.payload ? (
                              <Counter> {item.payload.quantity} </Counter>
                            ) : (
                              <Counter> {0} </Counter>
                            )}
                            <ProductButton
                              onClick={async (e) => {
                                let newItem = (item.payload = await Increasing(
                                  item._id
                                ));
                                setResponseOrderLine(newItem);
                              }}
                            >
                              {" "}
                              +{" "}
                            </ProductButton>
                            {/*                         <ProductButton onClick={() => setModalShow(true)} />
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          items={items}
                        /> */}
                          </div>
                        </ProductCard>,
                      ];
                    }
                  })}
                </ProductWrapper>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="preview">
              {responseOrderLine ? (
                <OrdersPreview newItemResponse={responseOrderLine} />
              ) : (
                <OrdersPreview newItemResponse={responseOrderLine} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
