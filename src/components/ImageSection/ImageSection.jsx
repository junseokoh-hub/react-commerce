import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchImages } from "../../lib/api";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const ImageWrapper = styled.section`
  padding-top: 300px;
  padding-bottom: 200px;
  h3 {
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
  margin: 0 auto;
  width: 50%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  li {
    display: flex;
  }
`;

const ImageSection = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["home", "images"],
    fetchImages,
  );

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  console.log(data.data.documents);

  const imageData = data.data.documents;

  return (
    <ImageWrapper>
      <h3>
        <Link to="https://www.instagram.com">
          <BsInstagram className="insta_logo" />
        </Link>
        <span>X</span>Instagram
      </h3>
      <hr />
      <ImageContainer>
        {imageData?.map((item) => (
          <li key={item.image_url}>
            <img src={item.thumbnail_url} alt={item.collection} />
          </li>
        ))}
      </ImageContainer>
    </ImageWrapper>
  );
};

export default ImageSection;
