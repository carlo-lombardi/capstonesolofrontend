import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import CompletedOrderContext from "../createContextToParents";
export default function PaypalIntegration() {
  const [OrdersAccepted, setOrdersAccepted] = useState();
  const totalFullOrdered = useContext(CompletedOrderContext);
  const [totalFullOrder, setTotalFullOrder] = useState(totalFullOrdered);
  const paypal = useRef();
  const history = useHistory();
  const orderId = localStorage.getItem("orderId");

  const payOrder = async (id) => {
    return await fetch(`/orders/setState`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, orderState: "Paid" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrdersAccepted(data);
      });
  };
  // const stimateResponse = JSON.parse(localStorage.getItem("stimateResponse"));
  // const totalPriceOFOrder = stimateResponse?.order?.order?.totalPriceOfOrder;
  useEffect(async () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          const stimateResponse = JSON.parse(
            localStorage.getItem("stimateResponse")
          );
          const totalPriceOFOrder =
            stimateResponse?.order?.order?.totalPriceOfOrder;
          console.log("what", data);
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Whatever",
                amount: {
                  currency_code: "EUR",
                  value: totalPriceOFOrder, // totalOrderWidthFeeIncluded.totalPriceOfOrder,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // const orderIds = localStorage.getItem("orderId");
          const order = await actions.order.capture();
          const { from } = history.location.state || {
            from: { pathname: "/cabify" },
          };
          history.push(from);
          console.log("Succesful order:" + order);
          payOrder(orderId);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return <div ref={paypal}></div>;
}
