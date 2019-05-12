export const userInitialState = {
  user: {}
};

export const userActions = {
  login: payload => {
    localStorage.rosterJWT = payload.token;
    return { user: payload };
  },
  logout: payload => {
    localStorage.removeItem("rosterJWT");
    return { user: payload };
  },
  query_running: payload => {
    return { queryRunning: true };
  },
  query_end: payload => {
    return { queryRunning: false };
  },
  forgotPasswordRequest: payload => {
    return;
  }
};
