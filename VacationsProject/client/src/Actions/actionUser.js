
const setUser = (user) =>{
    return {type: 'SET_USER',payload:user}
}

const getUser = () =>{
    return {type: 'GET_USER'}
}

export default {
    setUser,getUser
}