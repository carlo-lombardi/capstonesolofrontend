import React, { useState } from "react";
import { Nav, NavIcon, Burger, Container, NavLink, NavLogin } from "./Navbar";
import RegisterOrSignIn from "../RegisterModal";
import "./Navbar.css";
const Navbar = ({ toggle }) => {
  const [showModal, setModal] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <Nav>
          <Container>
            <NavLink to="/" className="nav-link">
              El Milagro
            </NavLink>
            <NavLogin onClick={() => setModal(true)}>Log in</NavLogin>
            <RegisterOrSignIn show={showModal} onHide={() => setModal(false)} />
            {/* <NavIcon onClick={toggle}> */}
            {/* <Burger /> */}
            {/* </NavIcon> */}
          </Container>
        </Nav>
      </div>
    </div>
  );
};
export default Navbar;
