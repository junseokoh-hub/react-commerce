import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../hooks/useCollection";
import { useTitle } from "../../hooks/useTitle";
import { authUserAtom } from "../../store/authAtom";
import { useFireStore } from "../../hooks/useFirestore";

const MyCartListWrapper = styled.section`
  padding: 20px 10px;
`;

const MyCartList = styled.li`
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 200px;
  }
`;

const ContentDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  span {
    margin-right: 130px;
    font-weight: bold;
  }
`;

const MyCartPage = () => {
  const authUser = useRecoilValue(authUserAtom);
  useTitle("My Cart");
  const { documents: carts, error } = useCollection("myCarts", [
    "uid",
    "==",
    authUser.user.uid,
  ]);

  const { updateDocument } = useFireStore("myCarts");

  const totalQuantity =
    !error &&
    carts &&
    carts.map((cart) => cart.quantity).reduce((a, c) => a + c);

  const totalPrice =
    !error &&
    carts &&
    carts
      .map((cart) => cart.price)
      .reduce((a, c) => a + c)
      .toFixed(2);

  return (
    <MyCartListWrapper>
      <ul>
        {!error &&
          carts &&
          carts.map((cart) => (
            <MyCartList key={Math.random()}>
              <img src={cart.image} alt={cart.title} />
              <ContentDetail>
                <span>{cart.title}</span>
                <span>
                  <button
                    disabled={cart.quantity === 1}
                    onClick={() =>
                      updateDocument(cart.title, {
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
                      updateDocument(cart.title, {
                        quantity: cart.quantity + 1,
                      })
                    }
                  >
                    +
                  </button>
                </span>
                <span>${cart.price?.toFixed(0)}</span>
              </ContentDetail>
            </MyCartList>
          ))}
      </ul>
      <hr />
      <TotalContainer>
        <span>총 갯수 : {totalQuantity}</span>
        <span>합계 : ${totalPrice}</span>
      </TotalContainer>
    </MyCartListWrapper>
  );
};

export default MyCartPage;
