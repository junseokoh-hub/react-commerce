import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authAtom } from "../store/authAtom";

const LoginPageContainer = styled.section`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  fieldset {
    width: 20vw;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  input {
    height: 30px;
  }
  button {
    height: 40px;
    font-size: 20px;
    font-weight: bolder;
  }
`;

const LoginPage = () => {
  const setIsAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  const changeInputHandlder = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e;
      setInputValue({ ...inputValue, [name]: value });
    },
    [inputValue],
  );

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("id", inputValue.id);
    setIsAuth(localStorage.getItem("id") !== null);
    if (localStorage.getItem("id") !== null) {
      navigate("/");
    } else {
      throw new Error("Something went wrong while logging in");
    }
  };

  return (
    <LoginPageContainer>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>로그인</legend>
          <label htmlFor="id">아이디</label>
          <input
            id="id"
            type="text"
            name="id"
            value={inputValue.id}
            onChange={changeInputHandlder}
          />
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            value={inputValue.password}
            onChange={changeInputHandlder}
          />
          <button type="submit">Log In</button>
          <span style={{ textAlign: "center" }}>Create Account</span>
        </fieldset>
      </form>
    </LoginPageContainer>
  );
};

export default LoginPage;
