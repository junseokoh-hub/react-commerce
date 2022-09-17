import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route />
        <Route />
      </Routes>
    </Layout>
  );
};

export default Router;
