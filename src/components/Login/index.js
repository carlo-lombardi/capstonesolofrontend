import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Login } from "../../servicesFetch/accountServicesFetch";
import ForgotPassword from "../ForgotPassword";
import "./index.css";
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
              <h3 className="card-header-h3">LOG IN</h3>
              <h6>
                or choose <Link>fast track</Link>
              </h6>
              <div className="card-body">
                <div className="form-group">
                  <label>Email address</label>
                  <Field
                    placeholder="Insert your email"
                    name="email"
                    type="text"
                    className={
                      "form-control-email-box" +
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
                  <label>Insert Password</label>
                  <Field
                    placeholder="Insert your password"
                    name="password"
                    type="password"
                    className={
                      "form-control-email-box" +
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
                  <div className="form-group-button col-12">
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
                  <div className="form-group-forgot-password mt-1 col-12 text-right">
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
