import React from "react";
import OutletLayout from "../../components/Layout/OutletLayout";
import MyPageImage from "../../components/MyPage/MyProfile/MyProfileImage";
import MyProfileInfo from "../../components/MyPage/MyProfile/MyProfileInfo";
import MyProfileLayout from "../../components/MyPage/MyProfile/MyProfileLayout";

const MyProfile = () => {
  return (
    <OutletLayout>
      <MyProfileLayout>
        <MyPageImage />
        <MyProfileInfo />
      </MyProfileLayout>
    </OutletLayout>
  );
};

export default MyProfile;
