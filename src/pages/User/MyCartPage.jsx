import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../hooks/useCollection";
import { authUserAtom } from "../../store/authAtom";
import MyCartList from "../../components/Cart/MyCartList";
import { Helmet } from "react-helmet-async";

const MyCartListWrapper = styled.section`
  padding: 20px 10px;
  ul {
    min-height: 400px;
    div {
      min-height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  span {
    margin-right: 20px;
    font-weight: bold;
  }
`;

const MyCartPage = () => {
  const authUser = useRecoilValue(authUserAtom);
  const { documents: carts, error } = useCollection(
    "myCarts",
    authUser.user && ["uid", "==", authUser.user.uid],
  );

  const totalQuantity =
    carts?.length > 0
      ? carts.map((cart) => cart.quantity).reduce((a, c) => a + c)
      : 0;

  const totalPrice =
    !error && carts?.length > 0
      ? carts.map((cart) => cart.price).reduce((a, c) => a + c, 0)
      : 0;

  console.log(carts);

  return (
    <>
      <Helmet>
        <title>내 상품 목록</title>
      </Helmet>
      <MyCartListWrapper>
        <ul>
          {!error &&
            carts &&
            carts.map((cart) => <MyCartList key={cart.id} cart={cart} />)}
          {carts?.length === 0 && <div>Nothing in your cart...</div>}
        </ul>
        <hr />
        <TotalContainer>
          <span>총 갯수 : {totalQuantity}</span>
          <span>합계 : ${totalPrice.toFixed(2)}</span>
        </TotalContainer>
      </MyCartListWrapper>
    </>
  );
};

export default MyCartPage;
