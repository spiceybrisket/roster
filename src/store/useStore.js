import React, { createContext, useContext } from "react";
import { userInitialState, userActions } from "./userActions";
import { activitiesInitialState, activityActions } from "./activityActions";
import { useLocalStorageReducer } from "react-storage-hooks";

// const isUserLoggedIn = !!localStorage.getItem("rosterJWT");
// combine initial states
const initialState = {
  ...userInitialState,
  ...activitiesInitialState,
  queryRunning: false
};

export const StoreContext = createContext(initialState);

// combine actions
const Actions = {
  ...userActions,
  ...activityActions
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
  const [state, dispatch] = useLocalStorageReducer(
    "rosterState",
    reducer,
    initialState
  );

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
