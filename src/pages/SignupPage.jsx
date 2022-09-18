import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignuptFieldset = styled.fieldset`
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

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const signupSubmitHandler = handleSubmit((data) => {
    if (window.confirm("회원가입을 하시겠습니까?")) {
      if (data.signupPassword !== data.passwordConfirm) {
        return setError("passwordConfirm", {
          message: "Passwords are not the same",
        });
      } else {
        navigate("/", { replace: true });
        reset();
      }
    }
    setError(
      "extraError",
      { message: "Server Offline" },
      { shouldFocus: true },
    );
  });

  const emailValidation = {
    required: { value: true, message: "You should enter your ID" },
    max: { value: 10, message: "Not over 10 letters" },
    min: { value: 5, message: "At leat 5 letters" },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[a-z]+.com$/,
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
    <SignupContainer>
      <form onSubmit={signupSubmitHandler}>
        <SignuptFieldset>
          <legend>회원가입</legend>
          <label htmlFor="signupEmail">이메일</label>
          <input
            {...register("signupEmail", emailValidation)}
            id="signupEmail"
            text="email"
          />
          <span>{errors.signupEmail?.message}</span>
          <label htmlFor="signupPassword">비밀번호</label>
          <input
            {...register("signupPassword", passwordValidation)}
            id="signupPassword"
            type="password"
          />
          <span>{errors.signupPassword?.message}</span>
          <label htmlFor="passwordConfirm">비밀번호 재확인</label>
          <input
            {...register("passwordConfirm")}
            id="passwordConfirm"
            type="password"
          />
          <span>{errors.passwordConfirm?.message}</span>
          <button>완료</button>
        </SignuptFieldset>
      </form>
    </SignupContainer>
  );
};

export default SignupPage;
