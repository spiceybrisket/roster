import React from "react";
import decode from "jwt-decode";
import { useStore } from "./store/useStore";
import { useRoutes } from "hookrouter";
import AuthedPages from "./AuthedPages";

import LoginPage from "./components/pages/LoginPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

import Header from "./components/headers/Header";
import HeaderAuthed from "./components/headers/HeaderAuthed";
import TopNavigation from "./components/navigaton/TopNavigation";

const App = () => {
  const { state } = useStore();

  if (localStorage.rosterJWT) {
    const decodedToken = decode(localStorage.rosterJWT);
    const user = {
      token: localStorage.rosterJWT,
      email: decodedToken.email,
      confirmed: decodedToken.confirmed,
      rosterRole: decodedToken.rosterRole,
      companyStaffId: decodedToken.companyStaffId,
      companyId: decodedToken.companyId,
      admin: decodedToken.admin
    };
    state.user = user;
  }

  const routes = {
    "/": () => <LoginPage />,
    "/login": () => <LoginPage />,
    "/forgot_password": () => <ForgotPasswordPage />,
    "/reset_password/:token": ({ token }) => (
      <ResetPasswordPage token={token} />
    ),
    "/confirmation/:token": ({ token }) => <ConfirmationPage token={token} />,

    // Everything authenticated is handled in here.
    "/authed*": () => <AuthedPages />
  };

  const result = useRoutes(routes);

  const isAuthenticasted = !!state.user.token;

  return (
    <div>
      <br />
      {isAuthenticasted ? <HeaderAuthed /> : <Header />}
      {isAuthenticasted && <TopNavigation />}
      <br />
      <br />
      {result || "Not found"}
    </div>
  );
};

export default App;
