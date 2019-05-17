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
    return { user: {} };
  },
  query_running: () => {
    return { queryRunning: true };
  },
  query_end: () => {
    return { queryRunning: false };
  },
  forgotPasswordRequest: payload => {
    return;
  },
  confirmUserEmail: payload => {
    localStorage.rosterJWT = payload.token;
    return { user: payload };
  }
};
