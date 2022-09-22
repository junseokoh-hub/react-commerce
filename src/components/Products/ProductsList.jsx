import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { handleImgError } from "../../utils/handleErrorImg";
import { BsCart4 } from "react-icons/bs";
import { useFireStore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { increment } from "firebase/firestore";
import { useMatch, useNavigate } from "react-router-dom";

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
    cursor: pointer;
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

const ProductsList = ({ title, image, thumbnail, price }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const searchMatch = useMatch("/search/*");
  const authUser = useRecoilValue(authUserAtom);
  const { documents: myCarts, error } = useCollection(
    "myCarts",
    authUser.user && ["uid", "==", authUser.user.uid],
  );
  const { setDocument, updateDocument } = useFireStore("myCarts");

  const addToCart = useCallback(() => {
    if (!authUser.user) {
      if (window.confirm("로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      const existingItem = myCarts.find((myCart) => myCart.id === title);
      console.log(existingItem);
      if (!existingItem) {
        if (window.confirm(`이 상품을 장바구니에 넣으시겠습니까?`)) {
          setDocument(title, {
            title,
            image: image || thumbnail,
            quantity,
            price: searchMatch ? price * 0.0007 : price,
            uid: authUser.user.uid,
          });
        } else {
          updateDocument(title, { quantity: increment(quantity) });
        }
      }
    }
    setQuantity(1);
  }, [authUser.user, setDocument, updateDocument]);

  return (
    <IndivProductArticle>
      <img src={image || thumbnail} alt={title} onError={handleImgError} />
      <h3>{title}</h3>
      <BtnContainer>
        <button
          disabled={quantity === 1}
          onClick={() => setQuantity((prev) => prev - 1)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          disabled={quantity === 50}
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </BtnContainer>
      <BsCart4 className="add_cart" onClick={addToCart} />
      <strong>{error}</strong>
    </IndivProductArticle>
  );
};

export default ProductsList;
