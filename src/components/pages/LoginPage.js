import React from "react";
import { useStore } from "../../store/useStore";
import { navigate, A } from "hookrouter";
import ForgotPasswordPage from "./ForgotPasswordPage";
import LoginForm from "../forms/LoginForm";
import api from "../../store/api";

const LoginPage = props => {
  const { state, dispatch } = useStore();
  const isAuthenticated = state.user.token;
  if (isAuthenticated) {
    navigate("/authed/dashboard");
  }

  const asyncFetch = data => {
    return new Promise((resolve, reject) => {
      const credentials = data;
      api.user
        .login(credentials)
        .then(resposneData => {
          console.log(resposneData);
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };
  const submit = data => {
    asyncFetch(data).then(response =>
      dispatch({ type: "login", payload: response })
    );
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm submit={submit} />
      <br />
      <A href="forgot_password">Forgot Password?</A>
    </div>
  );
};

export default LoginPage;
