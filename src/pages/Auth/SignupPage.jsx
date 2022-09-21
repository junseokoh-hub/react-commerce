import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";
import LoadingSpinner from "../../utils/LoadingSpinner";

const SignupContainer = styled.section`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignuptFieldset = styled.fieldset`
  width: 30vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.orange.lighter};

  legend,
  label {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${(props) => props.theme.orange.lighter};
  }

  label,
  input,
  button {
    height: 100px;
    width: 300px;
    margin: 0 auto;
  }

  input {
    margin-bottom: 10px;
  }

  input,
  button {
    border: 1px solid ${(props) => props.theme.orange.lighter};
  }

  button {
    border: none;
    font-size: 20px;
    font-weight: bolder;
    background-color: ${(props) => props.theme.orange.lighter};
    color: ${(props) => props.theme.whiteColor};
  }
  a {
    color: ${(props) => props.theme.orange.lighter};
  }
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: ${(props) => props.theme.red};
`;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const { isLoading, error, signup } = useSignup();

  const signupSubmitHandler = handleSubmit((data) => {
    if (window.confirm("회원가입을 하시겠습니까?")) {
      if (data.signupPassword !== data.passwordConfirm) {
        return setError("passwordConfirm", {
          message: "Passwords are not the same",
        });
      } else {
        if (!error && !isLoading) {
          signup(data.signupEmail, data.signupPassword, data.displayName);
          reset();
        }
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

  const displayNameValidation = {
    required: { value: true, message: "You should enter your DisplayName" },
    maxLength: { value: 15, message: "Not over 15 letters" },
    minLength: { value: 8, message: "At least 8 letters" },
    pattern: {
      value: /^[a-zA-Z\\d`~!@#$%^&*()-_=+]+$/,
      message: "Please enter your DisplayName",
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
      {!isLoading ? (
        <form onSubmit={signupSubmitHandler}>
          <SignuptFieldset>
            <legend>회원가입</legend>
            <label htmlFor="signupEmail">이메일</label>
            <input
              {...register("signupEmail", emailValidation)}
              id="signupEmail"
              text="email"
            />
            <ErrorMessage>{errors.signupEmail?.message}</ErrorMessage>
            <label htmlFor="displayName">닉네임</label>
            <input
              {...register("displayName", displayNameValidation)}
              id="displayName"
              type="text"
            />
            <ErrorMessage></ErrorMessage>
            <label htmlFor="signupPassword">비밀번호</label>
            <input
              {...register("signupPassword", passwordValidation)}
              id="signupPassword"
              type="password"
            />
            <ErrorMessage>{errors.signupPassword?.message}</ErrorMessage>
            <label htmlFor="passwordConfirm">비밀번호 재확인</label>
            <input
              {...register("passwordConfirm")}
              id="passwordConfirm"
              type="password"
            />
            <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
            <button>완료</button>
          </SignuptFieldset>
        </form>
      ) : (
        <LoadingSpinner />
      )}
    </SignupContainer>
  );
};

export default SignupPage;
