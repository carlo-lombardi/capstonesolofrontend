import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
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
  return (
    <PortContainer>
      <PortContent>
        <PortItems>
          <PortTitle>The Best Tacos Ever That</PortTitle>
          <PortAboutUs>Everyone taco about it</PortAboutUs>
          <Link to="/menu">
            <PortButton> Place Order</PortButton>
          </Link>
        </PortItems>
      </PortContent>
    </PortContainer>
  );
};
