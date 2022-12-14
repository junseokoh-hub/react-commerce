import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const LoginPageContainer = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 10px;
  }
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
  a {
    color: ${(props) => props.theme.orange.lighter};
  }
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: ${(props) => props.theme.red};
  :nth-of-type(3) {
    padding-top: 10px;
  }
`;

const LoginPage = () => {
  const { isLoading, error, login } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitAuthHandler = handleSubmit((data) => {
    login(data.emailInput, data.passwordInput);
    if (!error) {
      reset();
    }
  });

  const emailValidation = {
    required: { value: true, message: "You should enter your ID" },
    max: { value: 15, message: "Not over 15 letters" },
    min: { value: 5, message: "At leat 5 letters" },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[a-z]+.com$/,
      message: "You should enter Email",
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
    <>
      <Helmet>
        <title>?????????</title>
      </Helmet>
      <LoginPageContainer>
        {!isLoading ? (
          <form onSubmit={submitAuthHandler}>
            <LoginFieldset>
              <legend>?????????</legend>
              <label htmlFor="email">?????????</label>
              <input
                {...register("emailInput", emailValidation)}
                id="email"
                type="text"
              />
              <ErrorMessage>{errors.emailInput?.message}</ErrorMessage>
              <label htmlFor="password">????????????</label>
              <input
                {...register("passwordInput", passwordValidation)}
                id="password"
                type="password"
              />
              <ErrorMessage>{errors.passwordInput?.message}</ErrorMessage>
              <button type="submit">Log In</button>
              <Link to="/signup" style={{ textAlign: "center" }}>
                Create Account
              </Link>
              {error && <ErrorMessage>????????? ???????????????.</ErrorMessage>}
            </LoginFieldset>
          </form>
        ) : (
          <LoadingSpinner />
        )}
      </LoginPageContainer>
    </>
  );
};

export default LoginPage;
