import React from "react";
import { Helmet } from "react-helmet-async";
import OutletLayout from "../../components/Layout/OutletLayout";
import MyList from "../../components/MyPage/MyList/MyList";

const MyListPage = () => {
  return (
    <>
      <Helmet>
        <title>내 리스트</title>
      </Helmet>
      <OutletLayout>
        <MyList />
      </OutletLayout>
    </>
  );
};

export default MyListPage;
