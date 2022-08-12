import React, { createContext, useReducer } from "react";

import AppReducer, { HANDLE_LOG_IN, HANDLE_LOG_OUT } from "./AppReducer";

var user = localStorage.getItem("name");

const initialState = user
  ? {
      logged: true,
      userName: user,
    }
  : {
      logged: false,
      userName: "",
    };

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const handleLogin = (user) => {
    dispatch({ type: HANDLE_LOG_IN, username: user });
  };

  const handleLogout = () => {
    dispatch({ type: HANDLE_LOG_OUT });
  };

  const contextValue = {
    ...state,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
