import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import { navigate, A } from "hookrouter";
import api from "../../store/api";
import { Message } from "semantic-ui-react";

import LoginForm from "../forms/LoginForm";

const LoginPage = props => {
  const { state, dispatch } = useStore();
  const [errors, setErrors] = useState({});
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
          resolve(resposneData);
        })
        .catch(response => {
          setErrors({ global: "Inceorrect username and or password" });
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
      {errors.global && (
        <Message negative>
          <Message.Header negative>Something went wrong!</Message.Header>
          <p>{errors.global}</p>
        </Message>
      )}
      <LoginForm submit={submit} />
      <br />
      <A href="forgot_password">Forgot Password?</A>
    </div>
  );
};

export default LoginPage;
