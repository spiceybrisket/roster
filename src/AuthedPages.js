import React from "react";
import { useRoutes, navigate, useRedirect } from "hookrouter";

import { useStore } from "./store/useStore";

import DashboardPage from "./components/pages/DashboardPage";

const AuthedPages = props => {
  const { state } = useStore();

  const isAuthenticated = !!state.user.token;

  if (!isAuthenticated) {
    navigate("/login");
  }

  const authedRoutes = {
    "/dashboard": () => <DashboardPage />
  };

  const routeResult = useRoutes(authedRoutes);

  return routeResult;
};

export default AuthedPages;
