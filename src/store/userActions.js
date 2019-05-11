export const userInitialState = {
  user: {
    loggedIn: false
  }
};

export const userActions = {
  login: payload => {
    localStorage.rosterJWT = payload.token;
    return { user: payload, isUserLoggedIn: true };
  },
  logout: payload => {
    localStorage.removeItem("rosterJWT");
    return { user: payload };
  },
  loading_start: payload => {
    return { loading: true };
  },
  loading_end: payload => {
    return { loading: false };
  },
  forgotPasswordRequest: payload => {
    return;
  }
};
