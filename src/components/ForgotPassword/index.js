import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../servicesFetch/accountServicesFetch";
import LogIn from "../Login";
import "./index.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
export default function ForgotPassword() {
  const [displayer, setDisplayer] = useState(true);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const handleFormSubmit = ({ email }, { setSubmitting }) => {
    sendingTheData({ email }, { setSubmitting });
  };

  function sendingTheData({ email }, { setSubmitting }) {
    forgotPassword(email)
      .then(() =>
        alert("Please check your email for password reset instructions")
      )
      .catch((error) => console.log(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <>
      {displayer == true ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h3 className="forgot-password-header">Forgot Password ?</h3>
              <p className="forgot-password-subtitle mb-5">
                Enter your Email address. We will send a code to reset your
                password!
              </p>
              <div className="card-body">
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    placeholder="Insert your email"
                    name="email"
                    type="text"
                    className={
                      "form-email-forgot-password" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="forgot-password-button"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    SEND CODE
                  </button>
                  <button
                    onClick={() => setDisplayer(false)}
                    className="back-to-login-button"
                  >
                    <HiOutlineArrowNarrowLeft /> Back to login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <LogIn />
      )}
    </>
  );
}
