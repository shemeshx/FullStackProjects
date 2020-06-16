
 const reducerVacations = (state =[],action) =>{
    switch (action.type) {
        case "SET_VACATIONS":
          state = action.payload;
          return state;
        case "GET_VACATIONS":
          return state
        default:
          return state;
    }
}
export default reducerVacations