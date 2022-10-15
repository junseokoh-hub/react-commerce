import React from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import LoadingSpinner from "../../utils/LoadingSpinner";

const MyPage = () => {
  const authUser = useRecoilValue(authUserAtom);

  console.log(authUser.user);
  return (
    <>
      <Helmet>
        <title>내 정보</title>
      </Helmet>
      {authUser.user.photoURL === null ? (
        <LoadingSpinner />
      ) : (
        <img src="" alt="" />
      )}
      <div>{authUser.user.displayName}님</div>
    </>
  );
};

export default MyPage;
