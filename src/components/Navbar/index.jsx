import React, { useState } from "react";
import { Nav, Container, NavLink, NavLogin } from "./Navbar";
import RegisterOrSignIn from "../RegisterModal";
import "./Navbar.css";

const Navbar = ({ toggle }) => {
  const [showModal, setModal] = useState(false);
  /*   const [user, setUser] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://blogservice.herokuapp.com/api/login",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
  }; */

  return (
    <div className="container">
      <div className="row">
        <Nav>
          <Container>
            <NavLink to="/" className="nav-link">
              El Milagro
            </NavLink>
            <NavLogin onClick={() => setModal(true)}>Log in</NavLogin>
            {/*  user 
              ? <div>carlo lombardi</div>
              : <NavLogin onClick={() => setModal(true)}>Log in</NavLogin>
              
               */}
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
