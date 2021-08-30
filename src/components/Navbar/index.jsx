import React from "react";
import { Nav, NavIcon, NavLink, Bars } from "./Navbar";
const Navbar = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavIcon onClick={toggle}>
          <Bars />
        </NavIcon>
      </Nav>
    </>
  );
};
export default Navbar;
