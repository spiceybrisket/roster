import React, { createContext, useReducer, useContext } from "react";
import { userInitialState, userActions } from "./userActions";

const isUserLoggedIn = !!localStorage.getItem("rosterJWT");
// combine initial states
const initialState = {
  ...userInitialState,
  isUserLoggedIn
};

const StoreContext = createContext(initialState);

// combine actions
const Actions = {
  ...userActions
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const update = act(action.payload);
  return { ...state, ...update };
};

const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

const wrapperDispatch = dispatch => {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "query_running" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "query_end" });
      });
    } else {
      dispatch(action);
    }
  };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider
      value={{ state, dispatch: wrapperDispatch(dispatch) }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);

  return { state, dispatch };
};
