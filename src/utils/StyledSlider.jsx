import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const SliderContainer = styled(Slider)`
  width: 100%;
  margin: 0 auto;
`;

const ArrowContainer = styled.div`
  .slick-arrow {
    height: 35vh;
    width: 60px;
    background: transparent;
    color: #000;
    z-index: 10000;
    position: absolute;
    &:hover {
      color: #000;
    }
  }
  .slick-prev {
    left: 50px;
  }
  .slick-next {
    right: 50px;
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer>
      <MdKeyboardArrowRight
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    </ArrowContainer>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowContainer>
      <MdKeyboardArrowLeft
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    </ArrowContainer>
  );
}

const StyledSlider = ({ children }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <SliderContainer {...settings}>{children}</SliderContainer>
    </div>
  );
};

export default StyledSlider;
