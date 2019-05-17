import React, { useState, useEffect } from "react";
import { Message, Icon } from "semantic-ui-react";
import { useStore } from "../../store/useStore";
import api from "../../store/api";
import { A } from "hookrouter";

const useFetch = (dispatch, token) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.user.confirm(token);
      const data = await res.data;
      setSuccess(true);
      setLoading(false);
      dispatch({ type: "confirmUserEmail", payload: data.user });
    })();
  }, [dispatch, token]);

  return { success, loading };
};

const ConfirmationPage = ({ token }) => {
  const { dispatch } = useStore();
  const { success, loading } = useFetch(dispatch, token);
  return (
    <div>
      {loading && (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Header>Validating your email</Message.Header>
        </Message>
      )}

      {!loading && success && (
        <Message success icon>
          <Icon name="checkmark" />
          <Message.Content>
            <Message.Header>
              Thank you, Your email address has been verified
            </Message.Header>
            <A href="authed/dashboard">Go to your Dashboard</A>
          </Message.Content>
        </Message>
      )}

      {!loading && !success && (
        <Message negative icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>Ooops. Invalid token</Message.Header>
            <A href="/authed/dashboard">Go to your Dashboard</A>
          </Message.Content>
        </Message>
      )}
    </div>
  );
};

export default ConfirmationPage;
