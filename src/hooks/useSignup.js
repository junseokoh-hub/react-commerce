import { useState } from "react";
import { appAuth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authUserAtom } from "../store/authAtom";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthUser = useSetRecoilState(authUserAtom);
  const navigate = useNavigate();

  const signup = (email, password, displayName) => {
    setError(null);
    setIsLoading(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (!user) {
          throw new Error(`회원가입에 실패`);
        }
        navigate("/", { replace: true });
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            setAuthUser((prev) => ({ ...prev, user }));
            setError(null);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };
  return { isLoading, error, signup };
};
