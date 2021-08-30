const url = "http://localhost:3080/items";

async function addItemToOrder(payload) {
  try {
    const response = await fetch(url + `/orderLine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
