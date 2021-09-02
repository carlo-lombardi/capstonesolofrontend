import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { register } from "../../servicesFetch/accountServicesFetch";
import "./index.css";
import LogIn from "../Login";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
export default function Register() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const history = useHistory();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  const handleFormSubmit = (fields, { setStatus, setSubmitting }) => {
    sendingTheData(fields, { setStatus, setSubmitting });
  };

  async function sendingTheData(fields, { setStatus, setSubmitting }) {
    setStatus();

    register(fields)
      .then(() => {
        alert(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("/menu");
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error);
      });
  }

  return (
    <>
      {displayLogin == false ? (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            className="register-container"
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <h3 className="card-header-h3">SIGN UP</h3>
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
          <button
            onClick={() => {
              setDisplayLogin(true);
            }}
            className="back-to-login-button"
          >
            <HiOutlineArrowNarrowLeft /> Back to login
          </button>
        </>
      ) : (
        displayLogin == true && <LogIn />
      )}
    </>
  );
}
