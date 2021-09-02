import React, {useState} from "react";
import {Nav, NavIcon, Burger, Container, NavLink, NavLogin} from "./Navbar";
import RegisterOrSignIn from "../RegisterModal";
const Navbar = ({ toggle }) => {
  const [showModal, setModal] = useState(false);
  return (
    <Nav>
      <Container>
        <NavLink to="/">El Milagro</NavLink>
        <NavLogin onClick={() => setModal(true) }>Log in</NavLogin>
        <RegisterOrSignIn show={showModal} onHide={() => setModal(false)}/>
        <NavIcon onClick={toggle}>
          <Burger />
        </NavIcon>
      </Container>
    </Nav>
  );
};
export default Navbar;
