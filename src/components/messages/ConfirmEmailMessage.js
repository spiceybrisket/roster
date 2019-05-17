import React, { useState } from "react";
import { Message, Button } from "semantic-ui-react";
import { useStore } from "../../store/useStore";
import api from "../../store/api";

const ConfirmEmailMessage = () => {
  const { state } = useStore();
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const generateToken = user => {
    return new Promise((resolve, reject) => {
      console.log(user);
      api.user
        .generateConfirmToken(user)
        .then(resposneData => {
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };
  const handleOnClick = () => {
    generateToken(state.user).then(setTokenGenerated(true));
  };

  const renderNotGenMessage = () => {
    return (
      <Message negative>
        <Message.Header>
          <p>
            Please confirm your email address by clicking on the link in the
            welcome email that has been sent to you.
          </p>
          <Button primary onClick={handleOnClick}>
            Generate New Email
          </Button>
        </Message.Header>
      </Message>
    );
  };

  const renderGennedMessage = () => {
    return (
      <Message positive>
        <Message.Header>
          <p>Confirmation email has been sent</p>
        </Message.Header>
      </Message>
    );
  };

  return (
    <React.Fragment>
      {tokenGenerated === true ? renderGennedMessage() : renderNotGenMessage()}
    </React.Fragment>
  );
};

export default ConfirmEmailMessage;
