import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AboutUs from "../AboutUs/index";
import {
  PortContainer,
  PortTitle,
  PortItems,
  PortButton,
  PortContent,
  PortAboutUs,
} from "./PortElement";

export const Port = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [orderLine, setOrderLine] = useState([]);
  //const customerOrderId = localStorage.getItem("customerOrderId");
  const customerOrderId = "61492346c44c636f2cc7c491";

  useEffect(() => {
    theStoredOrder(customerOrderId);
  }, []);
  async function theStoredOrder(customerOrderId) {
    await fetch(`orders/${customerOrderId}/orderLine`)
      .then((response) => response.json())
      .then((data) => {
        setOrderLine(data);
      });
  }

  return (
    <>
      <PortContainer>
        <PortContent>
          <PortItems>
            <PortTitle>The Best Tacos Ever That</PortTitle>
            <PortAboutUs>Everyone taco about it</PortAboutUs>
            {customerOrderId ? (
              <Link to={`/menu/${customerOrderId}`}>
                <PortButton
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  {" "}
                  Place Order
                </PortButton>
              </Link>
            ) : (
              <Link to="/menu">
                <PortButton
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  {" "}
                  Place Order
                </PortButton>
              </Link>
            )}
          </PortItems>
        </PortContent>
      </PortContainer>
      {/* <AboutUs /> */}
    </>
  );
};
