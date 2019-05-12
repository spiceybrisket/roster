import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import { useStore } from "../../store/useStore";
import InlineError from "../messages/InLineError";

const ForgotPasswordForm = props => {
  const { state } = useStore();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ email: "" });

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const validateErrors = validate(data);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      state.loading = true;
      props.submit(data);
    }
  };

  const validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  return (
    <Form onSubmit={onSubmit} loading={state.loading}>
      {!!errors.global && <Message negative>{errors.global}</Message>}
      <Form.Field error={!!errors.email}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={onChange}
        />
        {errors.email && <InlineError text={errors.email} />}
      </Form.Field>
      <Button primary>Reset Password</Button>
    </Form>
  );
};

export default ForgotPasswordForm;
