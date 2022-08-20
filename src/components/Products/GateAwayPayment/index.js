import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckOut.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PaypalIntegration from "./Paypallntegration";
import OrderDetails from "./OrderDetail";
import CompletedOrderContext from "./createContextToParents";
import { Button } from "react-bootstrap";
// import InitAutocomplete from "../../GoogleMapAddress";
// import SearchLocationInput from "../../GoogleMapAddress";
import { useConstructor } from "../../../middleware/OrderManagement";

const GateAwayPayment = () => {
  const [order, setOrder] = useState([]);
  const [stimateResponse, setStimateResponse] = useState({});
  const orderId = localStorage.getItem("orderId");

  useEffect(() => {
    const result = fetch(`/orders/createStimate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: orderId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const callREsponse = {
          deliveryProductId: data.stimate.data.estimates[0].product.id,
          priceBase: data.stimate.data.estimates[0].priceBase,
          order: data.order,
        };
        localStorage.setItem("stimateResponse", JSON.stringify(callREsponse));
        setStimateResponse(callREsponse);
        setOrder(data.order);
        console.log("stimateResponse en estimate", callREsponse);
        // return callREsponse;
      });
    // return () => {
    //   cleanup
    // }
  }, []);

  console.log("stimateResponse", localStorage.getItem("stimateResponse"));
  const history = useHistory();
  const [displayer, setDisplayer] = useState(true);
  const [responseMessage, setResponseMessage] = useState();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  // useEffect(() => {

  //   setResponseMessage(fetchingTheData(orderId));
  // }, []);

  // useEffect(() => {
  //   fetchOrder(orderId);
  //   //fetchOrder(orderId);
  // }, [responseMessage]);

  // async function fetchOrder(orderId) {
  //   await fetch(`orders/${orderId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("fetchorder de data CSMR UNA VEZ MAS", data);
  //       setOrder(data);
  //     });
  // }
  const handleFormSubmit = ({ email, password }, { setSubmitting }) => {
    // sendingTheData(email, password, setSubmitting);
  };

  const payOrder = async (id) => {
    return await fetch(`/orders/setState`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, orderState: "Paid" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { from } = history.location.state || {
          from: { pathname: "/cabify" },
        };
        history.push(from);
        //setOrdersAccepted(data);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  console.log("slkfnsdjiafnlsand", order);
  return (
    <CompletedOrderContext.Provider value={{ ...order }}>
      {/* <div className="container">
        <div className="row mt-5 container-gateaway">
          <div className="col-md-12 col-lg-12 mt-5">
            <OrderDetails />
          </div>
          <div className="col-md-12 col-lg-12 mt-5">
            {/*             <Button className="button-help" onClick={() => payOrder(orderId)}>
              Cash
            </Button>
            <PaypalIntegration />
          </div>
        </div>
      </div> */}
      <h1
        style={{
          textAlign: "center",
          height: "52vh",
          marginTop: "19%",
        }}
      >
        Sorry We are still working in this section
      </h1>
    </CompletedOrderContext.Provider>
  );
};
export default GateAwayPayment;

{
  /*   <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              className="register-container"
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <h3 className="card-header-h3">Your information</h3>
                  <div className="card-body ">
                    <div className="form-group form-control-register">
                      <label className="form-control-register-label">
                        First Name
                      </label>
                      <Field
                        placeholder="Name"
                        name="firstName"
                        type="text"
                        className={
                          "form-control-register-box" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group form-control-register">
                      <label className="form-control-register-label">
                        Last Name
                      </label>
                      <Field
                        placeholder="Surname"
                        name="lastName"
                        type="text"
                        className={
                          "form-control-register-box" +
                          (errors.lastName && touched.lastName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group form-control-register">
                      <label className="form-control-register-label">
                        Email
                      </label>
                      <Field
                        placeholder="Insert your email"
                        name="email"
                        type="text"
                        className={
                          "form-control-register-box" +
                          (errors.email && touched.email ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group form-control-register">
                      <label className="form-control-register-label">
                        Phone
                      </label>
                      <Field
                        placeholder="Your phone number"
                        name="phone"
                        type="text"
                        className={
                          "form-control-register-box" +
                          (errors.phone && touched.phone ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <button onClick={() => payOrder(orderId)}>Cash</button> */
}
{
  /* <InitAutocomplete /> */
}
