import React from "react";
import MainHeader from "../MainHeader/MainHeader";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {/* <footer>Hello</footer> */}
    </>
  );
};

export default Layout;
