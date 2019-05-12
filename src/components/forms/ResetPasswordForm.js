import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import InLineError from "../messages/InLineError";
import { useStore } from "../../store/useStore";

const ResetPasswordForm = ({ token, submit }) => {
  const { state } = useStore();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    token,
    password: "",
    passwordConfirmation: ""
  });

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const validateErrors = validate(data);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      submit(data);
    }
  };

  const validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Password do not match";
    return errors;
  };
  const { loading } = state;
  return (
    <Form onSubmit={onSubmit} loading={loading}>
      <Form.Field error={!!errors.password}>
        <label htmlFor="password">New password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your new password"
          value={data.password}
          onChange={onChange}
        />
        {errors.password && <InLineError text={errors.password} />}
      </Form.Field>

      <Form.Field error={!!errors.passwordConfirmation}>
        <label htmlFor="passwordConfirmation">Confirm your new password:</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Type it again please"
          value={data.passwordConfirmation}
          onChange={onChange}
        />
        {errors.password && <InLineError text={errors.password} />}
      </Form.Field>

      <Button primary>Reset</Button>
    </Form>
  );
};

export default ResetPasswordForm;
