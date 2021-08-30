import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductInfo,
  ProductDesc,
  ProductButton,
  Counter,
} from "./ProductsElements";
import { NavLink } from "react-router-dom";
import OrdersPreview from "./PreviewOrder";
import MyVerticallyCenteredModal from "../Products/PopUpCard";

const Products = ({ heading, items }) => {
  const [modalShow, setModalShow] = useState(false);
  let [titleLabel, setTitleLabel] = useState("");
  const [responseOrderLine, setResponseOrderLine] = useState();

  async function Increasing(e) {
    return await fetch(`/order/orderLine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: e,
        orderId: responseOrderLine ? responseOrderLine.orderId : null,
        totalPriceOfOrderLine: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  async function Decreasing(e) {
    return await fetch(`/order/orderLine/${e}`, {
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
    <div id="orderNow">
      <ProductsHeading>{heading}</ProductsHeading>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
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
                              item._id
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
                            let itemDeleted = (item.payload = await Decreasing(
                              item._id
                            ));
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
          <div className="col-md-12 col-lg-4">
            {responseOrderLine ? (
              <OrdersPreview responseOrderLineItemId={responseOrderLine} />
            ) : (
              <OrdersPreview />
            )}
            <NavLink
              activeClassName="is-active"
              to="/gate-away-payment"
            ></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
