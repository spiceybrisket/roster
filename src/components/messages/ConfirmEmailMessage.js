import React from "react";
import { Message } from "semantic-ui-react";

const ConfirmEmailMessage = () => (
  <Message negative>
    <Message.Header>
      Please confirm your email address by clicking on the link in the welcome
      email that has been sent to you.
    </Message.Header>
  </Message>
);

export default ConfirmEmailMessage;
