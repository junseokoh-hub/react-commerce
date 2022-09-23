import React, { useMemo } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../hooks/useCollection";
import { useTitle } from "../../hooks/useTitle";
import { authUserAtom } from "../../store/authAtom";
import MyCartList from "../../components/Cart/MyCartList";

const MyCartListWrapper = styled.section`
  padding: 20px 10px;
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
  useTitle("My Cart");
  const { documents: carts, error } = useCollection("myCarts", [
    "uid",
    "==",
    authUser.user.uid,
  ]);

  const totalQuantity = useMemo(() => {
    return carts?.map((cart) => cart.quantity).reduce((a, c) => a + c);
  }, [carts]);

  const totalPrice =
    !error && carts && carts.map((cart) => cart.price).reduce((a, c) => a + c);

  return (
    <MyCartListWrapper>
      <ul>
        {!error &&
          carts &&
          carts.map((cart) => <MyCartList key={cart.id} cart={cart} />)}
      </ul>
      <hr />
      <TotalContainer>
        <span>총 갯수 : {totalQuantity}</span>
        <span>합계 : ${(totalPrice * totalQuantity).toFixed(2)}</span>
      </TotalContainer>
    </MyCartListWrapper>
  );
};

export default MyCartPage;
