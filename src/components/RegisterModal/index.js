import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./RegisterModal.css";
import LogIn from "../Login";
import Register from "../Register";

export default function RegisterOrSignIn(props) {
  const [displayer, setDisplayer] = useState(true);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="main_modal_login"
    >
      <Modal.Body>
        {displayer == true ? <LogIn /> : <Register />}
        <Link
          className="login_link"
          onClick={() => {
            setDisplayer(true);
          }}
        >
          Login
        </Link>
        <span> or </span>
        <Link
          className="register_link"
          onClick={() => {
            setDisplayer(false);
          }}
        >
          Register
        </Link>
      </Modal.Body>
    </Modal>
  );
}
