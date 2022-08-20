import React, { useState } from "react";
import Footer from "./components/Footer";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import GateAwayPayment from "./components/Products/GateAwayPayment/index";
import { Port } from "./components/Port";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { VerifyEmail } from "./components/verifyEmail";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import { Role } from "./servicesHelp/roles";
import CabifyOrder from "./loadingCabify";
import isValidOrderProvide from "./middleware/isValidOrder";
import { isValidOrder } from "./middleware/isValidOrder";

const Routing = () => {
  console.log("entra aqui raiz?");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <isValidOrderProvide.Provider value={isValidOrder}>
      <Router>
        <Route exact path="/" component={Port} />
        <Navbar toggle={toggle} />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Switch>
          {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
          <PrivateRoute
            path="/admin"
            roles={[Role.Admin]}
            component={ResetPassword}
          />
          <Route path="/gate-away-payment" component={GateAwayPayment} />
          <Route path="/menu" component={App} />
          <Route path="/account/reset-password" component={ResetPassword} />
          <Route path="/account/verify-email" component={VerifyEmail} />
          <Route path="/cabify" component={CabifyOrder} />
        </Switch>
        <Footer />
      </Router>
    </isValidOrderProvide.Provider>
  );
};

export default Routing;
