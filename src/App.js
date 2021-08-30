import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import Feature from "./components/Feature";

const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("/items/main")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  return (
    <>
      <Products heading="Choose your favorite" items={items} />
      <Feature />
    </>
  );
};

export default App;
