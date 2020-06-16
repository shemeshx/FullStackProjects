const reducerUser = (state = ["",0], action)=> {
    switch (action.type) {
      case "SET_USER":
        state = action.payload;
        return state;
      case "GET_USER":
        return state
      default:
        return state;
    }
  }
 
export default reducerUser
 