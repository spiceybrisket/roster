import React, { useState } from "react";
import { Form, Message, Button } from "semantic-ui-react";
import { useStore } from "../../store/useStore";
import isEmail from "validator/lib/isEmail";
import InLineError from "../messages/InLineError";

const App = props => {
  const { state } = useStore();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ email: "", password: "" });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const validateErrors = validate(data);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      props.submit(data);
    }
  };

  const validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email address";
    if (!data.email) errors.username = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  return (
    <div className="ui container">
      <Form onSubmit={onSubmit} loading={state.loading}>
        {errors.global && (
          <Message negative>
            <Message.Header negative>Something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={onChange}
          />
          {errors.email && <InLineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={data.password}
            onChange={onChange}
          />
          {errors.password && <InLineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    </div>
  );
};

export default App;
