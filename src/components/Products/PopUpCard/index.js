import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TickBox from "./tickBox";
import { addItemToOrder } from "../../../middleware/addItemHandler";

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
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {product.productName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h5>{product.description}</h5>
                <h4>Select Sauce</h4>
                <TickBox />
                <h4>Feeling thirsty ? </h4>
                <TickBox />
                <h4>Extras </h4>
                <TickBox />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            <Button>pay</Button>
          </Modal>
        );
      })}
    </>
  );
}
