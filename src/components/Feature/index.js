import React from "react";
import { Link } from "react-router-dom";
import { FeatureContainer, FeatureButton } from "./FeatureElements";

const Feature = () => {
  return (
    <FeatureContainer>
      <h1>Taco of the Day</h1>
      <p>The best tacos ever</p>
      <Link to="#orderNow">
        <FeatureButton>Place Order</FeatureButton>
      </Link>
    </FeatureContainer>
  );
};

export default Feature;
