import React, { useState } from "react";
import styled from "styled-components";
import { handleImgError } from "../../utils/handleErrorImg";
import { BsCart4 } from "react-icons/bs";

const IndivProductArticle = styled.div`
  padding: 10px;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  img {
    width: 200px;
    height: 200px;
  }
  .add_cart {
    position: absolute;
    bottom: 20px;
    right: 15px;
    font-size: 30px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    width: 30px;
  }
  button {
    margin: 0 10px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    background-color: ${(props) => props.theme.orange.normal};
    color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.orange.lighter};
    outline: none;
  }
`;

const ProductsList = ({ title, image, thumbnail }) => {
  const [count, setCount] = useState(1);
  return (
    <IndivProductArticle>
      <img src={image || thumbnail} alt={title} onError={handleImgError} />
      <h3>{title}</h3>
      <BtnContainer>
        <button
          disabled={count === 1}
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <span>{count}</span>
        <button
          disabled={count === 50}
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </BtnContainer>
      <BsCart4 className="add_cart" />
    </IndivProductArticle>
  );
};

export default ProductsList;
