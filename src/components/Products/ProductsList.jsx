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
  @media screen and (max-width: 550px) {
    .add_cart {
      bottom: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      width: 150px;
      height: 150px;
    }
    .add_cart {
      right: 5px;
      bottom: 20px;
    }
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
  const { documents: myCarts } = useCollection(
    "myCarts",
    authUser.user && ["uid", "==", authUser.user.uid],
  );
  const { setDocument, updateDocument } = useFireStore("myCarts");

  const addToCart = useCallback(() => {
    if (!authUser.user) {
      if (window.confirm("????????? ???????????????????")) {
        navigate("/login");
      }
    } else {
      const existingItem =
        myCarts &&
        myCarts.find((myCart) => myCart.id === title + authUser.user.uid);
      if (window.confirm(`??? ????????? ??????????????? ??????????????????????`)) {
        if (!existingItem) {
          setDocument(title + authUser.user.uid, {
            title,
            image: image || thumbnail,
            quantity,
            price: searchMatch ? price * 0.0007 : price,
            uid: authUser.user.uid,
          });
        } else {
          updateDocument(title + authUser.user.uid, {
            quantity: increment(quantity),
          });
        }
      }
    }
    setQuantity(1);
  }, [authUser.user, setDocument, updateDocument, quantity, price]);

  return (
    <IndivProductArticle>
      <img src={image || thumbnail} alt={title} onError={handleImgError} />
      <h3>{title}</h3>
      <span>
        {searchMatch ? "???" : "$"}
        {price}
      </span>
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
    </IndivProductArticle>
  );
};

export default React.memo(ProductsList);
