import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/authAtom";

const LoginPageContainer = styled.section`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFieldset = styled.fieldset`
  width: 30vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.orange.lighter};

  legend,
  label {
    font-weight: bold;
    color: ${(props) => props.theme.orange.lighter};
  }

  label,
  input,
  button {
    width: 300px;
    margin: 10px auto;
  }

  input,
  button {
    height: 40px;
    border: 1px solid ${(props) => props.theme.orange.lighter};
  }

  button {
    border: none;
    font-size: 20px;
    font-weight: bolder;
    background-color: ${(props) => props.theme.orange.lighter};
    color: ${(props) => props.theme.whiteColor};
  }
  span {
    color: red;
  }

  a {
    color: ${(props) => props.theme.orange.lighter};
  }
`;

const LoginPage = () => {
  const setIsAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitAuthHandler = handleSubmit((data) => {
    localStorage.setItem("email", data.emailInput);
    if (localStorage.getItem("email") !== null) {
      setIsAuth(localStorage.getItem("email") !== null);
      navigate("/", { replace: true });
      reset();
    } else {
      throw new Error("Something went wrong for Authentication!");
    }
  });

  const emailValidation = {
    required: { value: true, message: "You should enter your ID" },
    max: { value: 10, message: "Not over 10 letters" },
    min: { value: 5, message: "At leat 5 letters" },
    pattern: {
      value: /^[a-zA-Z0-9]+@[a-zA-Z0-9].com+$/,
      message: "You should enter Email includes `@`",
    },
  };

  const passwordValidation = {
    required: { value: true, message: "You should enter your Password" },
    maxLength: { value: 15, message: "Not over 15 letters" },
    minLength: { value: 8, message: "At least 8 letters" },
    pattern: {
      value: /^[a-zA-Z\\d`~!@#$%^&*()-_=+]+$/,
      message: "Please enter your Password",
    },
  };

  return (
    <LoginPageContainer>
      <form onSubmit={submitAuthHandler}>
        <LoginFieldset>
          <legend>로그인</legend>
          <label htmlFor="email">아이디</label>
          <input
            {...register("emailInput", emailValidation)}
            id="email"
            type="text"
          />
          <span>{errors.emailInput?.message}</span>
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("passwordInput", passwordValidation)}
            id="password"
            type="password"
          />
          <span>{errors.passwordInput?.message}</span>
          <button type="submit">Log In</button>
          <Link to="/signup" style={{ textAlign: "center" }}>
            Create Account
          </Link>
        </LoginFieldset>
      </form>
    </LoginPageContainer>
  );
};

export default LoginPage;
