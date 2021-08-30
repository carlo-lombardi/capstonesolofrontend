import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import App from "./App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import GateAwayPayment from "./components/Products/GateAwayPayment/index";
import { Port } from "./components/Port";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Routing = () => {
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
        <Route path="/gate-away-payment" component={GateAwayPayment} />
        <Route path="/menu" component={App} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routing;
