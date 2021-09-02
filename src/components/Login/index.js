import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Login } from "../../servicesFetch/accountServicesFetch";
import ForgotPassword from "../ForgotPassword";

export default function LogIn() {
  const history = useHistory();
  const [displayer, setDisplayer] = useState(true);
  const [responseMessage, setResponseMessage] = useState([]);
  console.log("creo", history);
  const registerModel = {
    email: "",
    password: "",
  };

  const handleFormSubmit = ({ email, password }, { setSubmitting }) => {
    sendingTheData(email, password, setSubmitting);
  };

  async function sendingTheData(email, password, setSubmitting) {
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
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <>
      {displayer == true ? (
        <Formik
          initialValues={registerModel}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h3 className="card-header">Login</h3>
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
                <div className="form-group">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    {responseMessage && <div>{responseMessage}</div>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Login
                    </button>
                  </div>
                  <div className="form-group col text-right">
                    <Link onClick={() => setDisplayer(false)}>
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <ForgotPassword />
      )}
    </>
  );
}
