import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;

  return (
    <button className="arrowButton" onClick={onClick}>
      ›
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;

  return (
    <button className="arrowButton arrowButton__prev" onClick={onClick}>
      ‹
    </button>
  );
};

const Carousel = ({ children }) => {
  return (
    <Slider
      slidesToShow={4}
      dots={false}
      draggable={false}
      infinite
      swipe={false}
      arrows
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 760, settings: { slidesToShow: 2 } },
        { breakpoint: 580, settings: { slidesToShow: 1 } },
      ]}
    >
      {children}
    </Slider>
  );
};

export { Carousel };
