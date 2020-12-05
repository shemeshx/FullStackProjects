
const initialState = {
    users: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "ADD_USER") {
      return {
        ...state,
        users:[...state.users,action.payload]
      }
    }
    return state;
  };
  
  export default rootReducer;