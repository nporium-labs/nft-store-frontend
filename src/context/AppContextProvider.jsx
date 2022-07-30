import React, { createContext, useReducer } from 'react'

import AppReducer, { HANDLE_LOG_IN, HANDLE_LOG_OUT } from './AppReducer'

const initialState = {
  logged: false
}

export const AppContext = createContext(null)

const AppContextProvider = (props) => {

  const { children } = props

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const handleLogin = () => {
    dispatch({type: HANDLE_LOG_IN})
  }

  const handleLogout = () => {
    dispatch({type: HANDLE_LOG_OUT})
  }

  const contextValue = {
    ...state,
    handleLogin: handleLogin,
    handleLogout: handleLogout
  }

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
