import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import NewPage from "./pages/NewPage";
import PopularPage from "./pages/PopularPage";
import ReviewPage from "./pages/ReviewPage";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";
import MyCartPage from "./pages/MyCartPage";
import MyPage from "./pages/MyPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import { useRecoilValue } from "recoil";
import { authAtom } from "./store/authAtom";
import SignupPage from "./pages/SignupPage";

const Router = () => {
  const isAuth = useRecoilValue(authAtom);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        {isAuth && <Route path="/myCart" element={<MyCartPage />} />}
        {!isAuth && <Route path="/myCart" element={<Navigate to="/login" />} />}
        <Route
          path="/myPage"
          element={isAuth ? <MyPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        {isAuth && <Route path="/login" element={<Navigate to="/myPage" />} />}
        {!isAuth && <Route path="/signup" element={<SignupPage />} />}
        {isAuth && <Route path="/signup" element={<Navigate to="/myPage" />} />}
      </Routes>
    </Layout>
  );
};

export default Router;
