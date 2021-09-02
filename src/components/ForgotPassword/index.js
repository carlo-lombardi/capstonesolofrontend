import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../servicesFetch/accountServicesFetch";
import LogIn from "../Login";

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
              <h3 className="card-header">Forgot Password</h3>
              <div className="card-body">
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Submit
                    </button>
                    <Link
                      onClick={() => setDisplayer(false)}
                      className="btn btn-link"
                    >
                      Cancel
                    </Link>
                  </div>
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
