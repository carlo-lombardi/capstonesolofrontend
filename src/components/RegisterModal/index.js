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
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {displayer == true ? <LogIn /> : <Register />}
        <button
          className="login_button mt-5"
          onClick={() => {
            setDisplayer(true);
          }}
        >
          Continue with Facebook
        </button>
        <button
          className="register_button mt-2"
          onClick={() => {
            setDisplayer(false);
          }}
        >
          CREATE A NEW ACCOUNT
        </button>
      </Modal.Body>
    </Modal>
  );
}
