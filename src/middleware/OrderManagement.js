export async function OrderPost(orderPart, setWholeProduct) {
  try {
    if (orderPart && orderPart._id == -1) return;

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
  if (!orderId || !orderInfo) return;

  orderInfo._id = orderId;
  console.log("orderinfo", orderInfo);
  const dataResult = await OrderPost(orderInfo);
  // const dataResult = await OrderPost({
  //   _id: orderInfo.orderInfo.orderId,
  //   orderType: "PickUp",
  // });
  // setWholeProduct(dataResult);
}
