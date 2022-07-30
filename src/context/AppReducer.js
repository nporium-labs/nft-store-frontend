export const HANDLE_LOG_IN = "HANDLE_LOG_IN"
export const HANDLE_LOG_OUT = 'HANDLE_LOG_OUT'

const AppReducer = (state, action) => {
  const { type } = action

  switch (type) {
    case HANDLE_LOG_IN:
      return {
        ...state,
        logged: true
      }
    case HANDLE_LOG_OUT:
      return {
        ...state,
        logged: false
      }
    default:
      return state
  }
}

export default AppReducer
