import React from "react";
import styled from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFireStore } from "../../hooks/useFirestore";

const MyCartItem = styled.li`
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.orange.lighter};
  display: grid;
  grid-template-columns: 2fr 4fr 1fr 1fr;

  img {
    width: 250px;
    height: 200px;
    place-self: center;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    .delete-bin {
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 768px) {
    img {
      width: 150px;
      height: 100px;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      width: 100px;
    }
    span {
      &:nth-of-type(2) {
        margin-left: 5px;
      }
      .delete-bin {
        margin-left: 5px;
        font-size: 16px;
      }
    }
  }
`;

const MyCartItemTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const MyCartBtnContainer = styled.span`
  span {
    width: 30px;
  }
  button {
    width: 40px;
    height: 40px;
    font-size: 30px;
    background-color: ${(props) => props.theme.orange.normal};
    color: ${(props) => props.theme.whiteColor};
    border: none;
    outline: none;
  }
  @media screen and (max-width: 768px) {
    span {
      width: 20px;
    }
    button {
      width: 20px;
      height: 20px;
      font-size: 15px;
    }
  }
`;

const MyCartList = ({ cart }) => {
  const { updateDocument, deleteDocument } = useFireStore("myCarts");

  return (
    <MyCartItem>
      <img src={cart.image} alt={cart.title} />
      <MyCartItemTitle>{cart.title}</MyCartItemTitle>
      <MyCartBtnContainer>
        <button
          disabled={cart.quantity === 1}
          onClick={() =>
            updateDocument(cart.title + cart.uid, {
              quantity: cart.quantity - 1,
            })
          }
        >
          -
        </button>
        <span>{cart.quantity}</span>
        <button
          disabled={cart.quantity === 50}
          onClick={() =>
            updateDocument(cart.title + cart.uid, {
              quantity: cart.quantity + 1,
            })
          }
        >
          +
        </button>
      </MyCartBtnContainer>
      <span>
        ${(cart.price * cart.quantity).toFixed(2)}
        <RiDeleteBin5Line
          className="delete-bin"
          onClick={() => deleteDocument(cart.title + cart.uid)}
        />
      </span>
    </MyCartItem>
  );
};

export default React.memo(MyCartList);
