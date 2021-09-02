import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { verifyEmail } from "../../servicesFetch/accountServicesFetch";
// import { accountService, alertService } from "@/_services";

export function VerifyEmail() {
  const history = useHistory();
  console.log("que me da", history);
  const EmailStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { token } = queryString.parse(history.location.search);
    console.log("token?", token);
    // remove token from url to prevent http referer leakage
    history.replace(history.location.pathname);

    verifyEmail(token)
      .then(() => {
        alert("Verification successful, you can now login", {
          keepAfterRouteChange: true,
        });
        history.push("/");
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{" "}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
    }
  }

  return (
    <div>
      <h3 className="card-header">Verify Email</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
}
