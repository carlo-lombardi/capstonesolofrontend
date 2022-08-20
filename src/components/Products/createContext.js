import React from "react";

const orderContext = React.createContext({});

export async function getPickDeliveryTime(option) {
  return [
    {
      name: "{option} at",
      time: "12:15:00",
    },
    {
      name: "Pick Up at",
      time: "12:30:00",
    },
    {
      name: "Pick Up at",
      time: "12:45:00",
    },
    {
      name: "Pick Up at",
      time: "13:00:00",
    },
  ];
}

export default orderContext;
