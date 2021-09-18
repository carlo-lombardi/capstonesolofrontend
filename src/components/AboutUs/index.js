import React from "react";
import "./index.css";
import tacosPortada from "../../assest/tacosPortada.jpg";
import tacosPortada2 from "../../assest/tacosPortada2.jpg";
// import carnitas from "../../assest/carnitas.jpg";
import Carousel from "react-bootstrap/Carousel";

export default function AboutUs() {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-6 mt-5 mb-5 p-5">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="w-100 image-about-us"
              src={tacosPortada}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 image-about-us"
              src={tacosPortada2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 image-about-us"
              src={tacosPortada}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="col-md-12 col-lg-6 mt-5 p-5 about-us-text-semi-port">
        <div className="w-100 h-100">
          <h1>OUR MENUS</h1>
          <p>
            Our creative, elevated food and beverage program combines satisfying
            staples with imaginative twists. From boozy brunches and happy hours
            to family dinners, special occasions and everything in between, The
            Original has something for everyone.
          </p>
        </div>
        <div className="view-menu-button">
          <button>View menu</button>
        </div>
      </div>
    </div>
  );
}
