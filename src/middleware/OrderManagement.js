import react, { useState } from "react";
import { isValidOrder } from "./isValidOrder";
async function OrderPost(orderPart, setWholeProduct) {
  try {
    if (orderPart && !isValidOrder(orderPart._id)) return;

    return await fetch(`/orders/fullOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData(orderPart)),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
}

function orderData(orderPart) {
  return orderPart;
}

export async function SetOrderInfo(orderInfo) {
  const orderId = localStorage.getItem("orderId");
  if (!isValidOrder(orderId) || !orderInfo) return;

  orderInfo._id = orderId;
  return await OrderPost(orderInfo);
}

// export const useConstructor = (callBack = () => {}) => {
//   const orderId = localStorage.getItem("orderId");
//   const [hasBeenCalled, setHasBeenCalled] = useState(false);
//   if (hasBeenCalled) return;
//   callBack();
//   setHasBeenCalled(true);
// };
// let haveToConstruct = localStorage.getItem("haveToConstruct");
// if (haveToConstruct == undefined) haveToConstruct = true;

export const useConstructor = (callBack = () => {}) => {
  //console.log("app lyfecycle primero constructor before");
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const orderId = localStorage.getItem("orderId");
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
  //console.log("app lyfecycle primero constructor after");
};
