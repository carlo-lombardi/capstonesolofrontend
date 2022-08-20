import React from "react";

const isValidOrderProvide = React.createContext();

export function isValidOrder(id) {
  // return id != "-1" || id
  const values = ["-1", -1, null, undefined, "undefined"];
  return !values.includes(id);
}

export default isValidOrderProvide;
