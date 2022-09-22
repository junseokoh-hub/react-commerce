import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authUserAtom } from "../store/authAtom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthUser = useSetRecoilState(authUserAtom);

  const login = (email, password) => {
    setError(null);
    setIsLoading(true);

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuthUser((prev) => ({ ...prev, user }));
        setError(null);
        setIsLoading(false);
        if (!user) {
          throw new Error(`회원가입에 실패`);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };
  return { isLoading, error, login };
};
