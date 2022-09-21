import { signOut } from "firebase/auth";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { appAuth } from "../lib/firebaseConfig";
import { authUserAtom } from "../store/authAtom";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthUser = useSetRecoilState(authUserAtom);

  const logout = () => {
    setError(null);
    setIsLoading(true);

    signOut(appAuth)
      .then(() => {
        setAuthUser((prev) => ({ ...prev, user: null }));
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return { isLoading, error, logout };
};
