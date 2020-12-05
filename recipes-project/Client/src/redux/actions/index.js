import axios from 'axios';
export function addUser() {
    return dispatch =>{
      axios.get("https://jsonplaceholder.typicode.com/users/1")
      .then(res=>{
        console.log(res)
        dispatch(addingUser({"name":res.data.name}))
      })
    }
  };

function addingUser(payload) {
  return { type: "ADD_USER", payload }
}