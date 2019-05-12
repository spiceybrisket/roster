import React, { useState } from "react";
import { Message } from "semantic-ui-react";

import { useStore } from "../../store/useStore";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import api from "../../store/api";

const ForgotPasswordPage = () => {
  const { dispatch } = useStore();
  const [success, setSuccess] = useState(false);

  const asyncFetch = data => {
    return new Promise((resolve, reject) => {
      api.user
        .resetPasswordRequest(data.email)
        .then(resposneData => {
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };

  const submit = data => {
    asyncFetch(data)
      .then(response => {
        dispatch({ type: "forgotPasswordRequest", payload: response });
      })
      .then(setSuccess(true));
  };

  return (
    <div>
      {success ? (
        <Message>Email has been sent.</Message>
      ) : (
        <ForgotPasswordForm submit={submit} />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
