import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchImages } from "../../lib/api";
import { BsInstagram } from "react-icons/bs";
import LoadingSpinner from "../../utils/LoadingSpinner";

const ImageWrapper = styled.section`
  padding-top: 200px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bolder;
    .insta_logo {
      display: flex;
      color: ${(props) => props.theme.blackColor};
    }
    span {
      font-weight: normal;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
      margin: 0 10px;
    }
  }
`;

const ImageContainer = styled.ul`
  width: 50%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  transition: all 0.9s ease-in-out;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};

  li {
    display: flex;
  }

  @media screen and (max-width: 1000px) {
    width: 70%;
    img {
      width: 100px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    img {
      width: 75px;
    }
  }
  @media screen and (max-width: 480px) {
    width: 90%;
  }
`;

const ImageSection = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["home", "images"],
    fetchImages,
  );

  const imageData = data?.data?.documents;

  const imgRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  const callback = (entries, observer) => {
    const [entry] = entries;
    setAnimated(entry.isIntersecting);
    if (entry.isIntersecting) {
      observer.unobserve(imgRef.current);
    }
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(callback, options);
    const currentTarget = imgRef.current;
    if (currentTarget) {
      io.observe(currentTarget);
    }
  }, [imgRef, options]);

  return (
    <ImageWrapper>
      <h3>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.instagram.com"
        >
          <BsInstagram className="insta_logo" />
        </a>
        <span>X</span>Instagram
      </h3>
      {isLoading && <LoadingSpinner />}
      {isError && <div>{error?.message}</div>}
      <ImageContainer
        ref={imgRef}
        opacity={animated ? 1 : 0}
        transform={!animated ? "translateY(100px)" : null}
      >
        {imageData?.map((item) => (
          <li key={item.image_url}>
            <img src={item.thumbnail_url} alt={item.collection} />
          </li>
        ))}
      </ImageContainer>
    </ImageWrapper>
  );
};

export default React.memo(ImageSection);
