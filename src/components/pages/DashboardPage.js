import React from "react";
import { useStore } from "../../store/useStore";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import Calendar from "../misc/Calendar";

const DashboardPage = () => {
  const { state } = useStore();
  console.log(state);

  const isConfirmed = !!state.user.confirmed;
  return (
    <div>
      <h2>Your Dashobaord</h2>
      {!isConfirmed && <ConfirmEmailMessage />}
      <Calendar />
    </div>
  );
};

export default DashboardPage;
