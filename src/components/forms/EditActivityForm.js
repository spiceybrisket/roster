import React, { useState } from "react";
import { Form, Button, Card } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import InLineError from "../messages/InLineError";
import { useStore } from "../../store/useStore";
import { format } from "date-fns";

import uuid from "uuid";

import StaffCard from "../cards/StaffCard";
import HorizontalDivider from "../dividers/HorizontalDivider";

const formatDates = dates => {
  let returnDate = "";
  if (dates.length === 1) {
    returnDate = `${format(dates[0].date, "DD/MM/YY")} - ${format(
      dates[0].date,
      "DD/MM/YY"
    )}`;
  }
  return returnDate;
};

const EditActivityForm = props => {
  const { state } = useStore();
  const activity = state.editActivity;
  activity.dates = formatDates(state.editActivity.dates);
  const [data, setData] = useState(activity);
  const [loading, setLoading] = useState();
  console.log(state);
  const [errors, setErrors] = useState({});

  const isNotAdmin = state.user.admin !== true ? true : false;

  const onChange = e => {
    setData({ ...state, [e.target.name]: e.target.value });
    setErrors({ [e.target.name]: "Cahnges detected" });
  };

  const onSubmit = e => {
    e.preventDefault();
    const validateErrors = validate(data);
    setErrors(validateErrors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      props.submit(data);
    }
  };

  const validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    return errors;
  };
  // console.log(state.editActivity);
  return (
    <Form onSubmit={onSubmit} loading={loading}>
      <Form.Group widths="equal">
        <Form.Field error={!!errors.name} disabled={isNotAdmin}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="placeholder"
            value={data.name}
            onChange={onChange}
          />
          {errors.name && <InLineError text={errors.name} />}
        </Form.Field>
        <Form.Field error={!!errors.dates} disabled={isNotAdmin}>
          <label htmlFor="dates">From - To:</label>
          <DatesRangeInput
            name="dates"
            placeholder="From - To"
            animation="scale"
            value={data.dates}
            iconPosition="left"
            onChange={onChange}
          />
          {errors.dates && <InLineError text={errors.dates} />}
        </Form.Field>
      </Form.Group>
      <HorizontalDivider />
      <h2>Assigned Staff:</h2>
      <Card.Group>
        {typeof data.staff === "undefined"
          ? ""
          : data.staff.map(s => {
              return <StaffCard key={uuid.v4()} data={s} />;
            })}
      </Card.Group>
      <br />
      {isNotAdmin === false ? (
        <Button primary>Save</Button>
      ) : (
        <Button primary>Cancel</Button>
      )}
    </Form>
  );
};

export default EditActivityForm;
