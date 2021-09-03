import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckOut.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const GateAwayPayment = () => {
  const history = useHistory();
  const [displayer, setDisplayer] = useState(true);
  const [responseMessage, setResponseMessage] = useState([]);
  console.log("creo", history);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };
  const handleFormSubmit = ({ email, password }, { setSubmitting }) => {
    // sendingTheData(email, password, setSubmitting);
  };

  /*   async function sendingTheData(email, password, setSubmitting) {
    Login(email, password)
      .then(() => {
        const { from } = history.location.state || {
          from: { pathname: "/" },
        };
        history.push(from);
      })
      .catch((error) => {
        setSubmitting(false);
        setResponseMessage(error);
      });
  } */
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <Formik
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
                    <label className="form-control-register-label">Email</label>
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
                    <label className="form-control-register-label">Phone</label>
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
                  <div className="form-group form-control-register">
                    <label className="form-control-register-label">
                      Password
                    </label>
                    <Field
                      placeholder="Insert your password"
                      name="password"
                      type="password"
                      className={
                        "form-control-register-box" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group form-control-register">
                    <label className="form-control-register-label">
                      Confirm Password
                    </label>
                    <Field
                      placeholder="Insert your password again"
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control-register-box" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group form-check">
                    <Field
                      type="checkbox"
                      name="acceptTerms"
                      id="acceptTerms"
                      className={
                        "form-check-input " +
                        (errors.acceptTerms && touched.acceptTerms
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <label htmlFor="acceptTerms" className="form-check-label">
                      Accept Terms & Conditions
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="register-button"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-12 col-lg-6">sadasdasd</div>
      </div>
    </div>
  );
};
export default GateAwayPayment;
