import React from "react";
import { useStore } from "../../store/useStore";

import EditActivityForm from "../forms/EditActivityForm";

const EditActivityPage = () => {
  const { state } = useStore();

  console.log(state);

  return (
    <div>
      <h1>Edit activity</h1>
      <EditActivityForm />
    </div>
  );
};

export default EditActivityPage;
