import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import api from "../../store/api";
import { navigate } from "hookrouter";

import ResetPasswordForm from "../forms/ResetPasswordForm";

const ResetPasswordPage = ({ token }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Validating Token");

  const validateToken = token => {
    return new Promise((resolve, reject) => {
      api.user
        .validateToken(token)
        .then(resposneData => {
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };

  const resetPassword = data => {
    return new Promise((resolve, reject) => {
      api.user
        .resetPassword(data)
        .then(resposneData => {
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };

  useEffect(() => {
    validateToken(token)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch(() => {
        setSuccess(false);
        setLoading(false);
        setMessage("Invalid Token");
      });
  });

  const submit = data => resetPassword(data).then(navigate("/login"));

  return (
    <div>
      {loading && <Message>{message}</Message>}
      {!loading && success && (
        <ResetPasswordForm submit={submit} token={token} />
      )}
      {!loading && !success && <Message>{message}</Message>}
    </div>
  );
};

export default ResetPasswordPage;
