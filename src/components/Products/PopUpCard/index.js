import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TickBox from "./tickBox";
import "./index.css";
export default function MyVerticallyCenteredModal(props) {
  return (
    <>
      {props.items.map((product, idx) => {
        return (
          <Modal
            key={idx}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-toppings"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="modal-toppings-body">
              <div>
                <h4>Select Sauce</h4>
                <TickBox />
                <h4>Feeling thirsty ? </h4>
                <TickBox />
                <h4>Extras </h4>
                <TickBox />
              </div>
            </Modal.Body>
            <Button>pay</Button>
          </Modal>
        );
      })}
    </>
  );
}
