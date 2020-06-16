const setVacations = (vacation) =>{
    return {type: 'SET_VACATIONS',payload:vacation}
}

const getVacations = () =>{
    return {type: 'GET_VACATIONS'}
}

export default {
    setVacations,getVacations
}