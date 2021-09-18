import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export default function PaypalIntegration() {
  const paypal = useRef();
  const [OrdersAccepted, setOrdersAccepted] = useState();
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

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Whatever",
                amount: {
                  currency_code: "EUR",
                  value: 10.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
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
