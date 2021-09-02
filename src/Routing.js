import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import GateAwayPayment from "./components/Products/GateAwayPayment/index";
import { Port } from "./components/Port";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { VerifyEmail } from "./components/verifyEmail";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import { Role } from "./servicesHelp/roles";
import { userSubjectValue } from "./servicesFetch/accountServicesFetch";

const Routing = () => {
  /*   const history = useHistory();
  console.log(history);
  const pathname = history.location.pathname;
  const [user, setUser] = useState({});
  console.log("es to es una mierda", pathname);

  useEffect(() => {
    const subscription = userSubjectValue.user.subscribe((x) => {
      console.log("whats that", x);
      setUser(x);
    });
    return subscription.unsubscribe;
  }, []); */
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Route exact path="/" component={Port} />
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
        <PrivateRoute path="/gate-away-payment" component={GateAwayPayment} />
        <PrivateRoute
          path="/admin"
          roles={[Role.Admin]}
          component={ResetPassword}
        />
        <Route path="/menu" component={App} />
        <Route path="/account/reset-password" component={ResetPassword} />
        <Route path="/account/verify-email" component={VerifyEmail} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routing;
