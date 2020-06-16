import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import RVacation from './RVacation';
import {useDispatch} from 'react-redux'
import allActions from '../Actions/allActions'
import {Flipped } from 'react-flip-toolkit'

export default function VacationsUser() {
    const username = useSelector(state=>state.user)
    const dispatch =useDispatch()
    const vacationsG = useSelector(state=>state.vacations)
  
    const setVacations = async () =>{
        
        let response = await fetch(`http://localhost:3000/vacations/username/${username[0]}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
        let json = await response.json()
        dispatch(allActions.actionVacations.setVacations(json))
    }
    
    useEffect(()=>{
      
    },[])
    return (
        <div>
           {vacationsG.map(vacation=> {
           return (
                <Flipped key={vacation.id} flipId={vacation.id} stagger>
                    <RVacation key={vacation.id} setvacations={setVacations} vacation={vacation}/>
                </Flipped>
                )
            })}
        </div>
    )
}
