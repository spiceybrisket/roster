import React from "react";
import { useRoutes, navigate } from "hookrouter";

import { useStore } from "./store/useStore";

import EditActivityPage from "./components/pages/EditActivityPage";

const ActivitiesPages = props => {
  const { state } = useStore();

  const isAuthenticated = !!state.user.token;

  if (!isAuthenticated) {
    navigate("/login");
  }

  const authedRoutes = {
    "/edit/:activityId": ({ activityId }) => (
      <EditActivityPage activityId={activityId} />
    )
  };

  const routeResult = useRoutes(authedRoutes);

  return routeResult;
};

export default ActivitiesPages;
