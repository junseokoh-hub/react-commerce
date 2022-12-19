import React, { useEffect } from "react";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilState } from "recoil";
import { authUserAtom } from "./store/authAtom";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./lib/firebaseConfig";
import LoadingSpinner from "./utils/LoadingSpinner";

function App() {
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      setAuthUser((prev) => ({ ...prev, user, isAuthReady: true }));
    });
    return unsubscribe;
  }, [setAuthUser]);

  return (
    <>
      {authUser.isAuthReady ? (
        <>
          <Router />
          <GlobalStyle />
          <ReactQueryDevtools />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default App;
