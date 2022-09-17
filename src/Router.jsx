import React from "react";
import { Routes, Route } from "react-router-dom";
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

const Router = () => {
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
        <Route path="/myCart" element={<MyCartPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
};

export default Router;
