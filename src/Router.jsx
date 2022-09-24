import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ReviewPage from "./pages/Community/ReviewPage";
import CommunityPage from "./pages/Community/CommunityPage";
import AboutPage from "./pages/AboutPage";
import MyCartPage from "./pages/User/MyCartPage";
import MyPage from "./pages/User/MyPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFound from "./pages/NotFound";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "./store/authAtom";
import SignupPage from "./pages/Auth/SignupPage";
import Faq from "./pages/Community/Faq";
import ReviewEditor from "./components/Review/ReviewEditor";

const Router = () => {
  const authUser = useRecoilValue(authUserAtom);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/community/*" element={<CommunityPage />}>
          <Route path="review/*" element={<ReviewPage />}>
            <Route path="edit" element={<ReviewEditor />} />
          </Route>
          <Route path="faq" element={<Faq />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        {authUser.user && <Route path="/myCart" element={<MyCartPage />} />}
        {!authUser.user && (
          <Route path="/myCart" element={<Navigate to="/login" />} />
        )}
        <Route
          path="/myPage"
          element={authUser.user ? <MyPage /> : <Navigate to="/login" />}
        />
        {!authUser.user && <Route path="/login" element={<LoginPage />} />}
        {authUser.user && (
          <Route path="/login" element={<Navigate to="/" replace={true} />} />
        )}
        {!authUser.user && <Route path="/signup" element={<SignupPage />} />}
        {authUser.user && (
          <Route path="/signup" element={<Navigate to="/" replace={true} />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Router;
