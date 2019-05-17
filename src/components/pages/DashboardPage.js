import React from "react";
import { useStore } from "../../store/useStore";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import Calendar from "../misc/Calendar";

const DashboardPage = () => {
  const { state } = useStore();

  const isConfirmed = !!state.user.confirmed;

  return (
    <div>
      {!isConfirmed && <ConfirmEmailMessage />}
      <h2>Your Dashobaord</h2>
      <Calendar />
    </div>
  );
};

export default DashboardPage;
