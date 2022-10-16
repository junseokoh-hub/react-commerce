import React from "react";
import { useRecoilValue } from "recoil";
import OutletLayout from "../../components/Layout/OutletLayout";
import MyPageImage from "../../components/MyPage/MyProfile/MyProfileImage";
import { authUserAtom } from "../../store/authAtom";

const MyProfile = () => {
  const authUser = useRecoilValue(authUserAtom);
  return (
    <OutletLayout>
      <MyPageImage />
      <div>{authUser.user.displayName}님</div>
    </OutletLayout>
  );
};

export default MyProfile;
