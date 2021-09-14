import React from "react";
import { FeatureContainer, FeatureButton } from "./FeatureElements";

const Feature = () => {
  return (
    <FeatureContainer>
      <h1>Taco of the Day</h1>
      <p>the best tacos ever</p>
      <FeatureButton>
        <a href="#orderNow"> Place Order</a>
      </FeatureButton>
    </FeatureContainer>
  );
};

export default Feature;
