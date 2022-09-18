import React from "react";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
