import React from "react";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../hooks/useCollection";
import { useTitle } from "../../hooks/useTitle";
import { authUserAtom } from "../../store/authAtom";

const MyCartPage = () => {
  const authUser = useRecoilValue(authUserAtom);
  useTitle("My Cart");
  const { documents: carts, error } = useCollection("myCarts", [
    "uid",
    "==",
    authUser.user.uid,
  ]);

  console.log(carts);
  return (
    <div>
      {!error &&
        carts &&
        carts.map((cart) => <div key={Math.random()}>{cart.title}</div>)}
    </div>
  );
};

export default MyCartPage;
