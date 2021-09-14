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
