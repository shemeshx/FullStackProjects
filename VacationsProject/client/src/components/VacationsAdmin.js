import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import AVacation from './AVacation';
import {useDispatch} from 'react-redux'
import allActions from '../Actions/allActions'
import {Button, ButtonGroup} from 'react-bootstrap'
import VacationModal from './VacationModal'
import ReportModal from './ReportModal'
export default function VacationsAdmin() {
    const username = useSelector(state=>state.user)
    const dispatch =useDispatch()
    const vacationsG = useSelector(state=>state.vacations)
    const [showVacationModal, setShowVacationModal] = useState(false);
    const handleCloseVacationModal = () => setShowVacationModal(false);
    const handleShowVacationModal = () => setShowVacationModal(true);
    const [showReportModal, setShowReportModal] = useState(false);
    const handleCloseReportModal = () => setShowReportModal(false);
    const handleShowReportModal = () => setShowReportModal(true);
    
    const setVacations = async () =>{
        let response = await fetch(`http://localhost:3000/vacations/username/${username[0]}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
        let json = await response.json()
        dispatch(allActions.actionVacations.setVacations(json))
    }
    

    useEffect(()=>{
        const checkSession = async ()=>{
            try{
                let response = await fetch('http://localhost:3000/users/login',{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
                if(response.status===200)
                {
                    response = await response.json()
                    let isAdmin = await fetch(`http://localhost:3000/users/isadmin/${response.username}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
                    isAdmin = await isAdmin.json()
                    dispatch(allActions.actionUser.setUser([response.username,isAdmin]))
                    response = await fetch(`http://localhost:3000/vacations/username/${username}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
                    let json = await response.json()
                    dispatch(allActions.actionVacations.setVacations(json))
                }
            }catch(err){
                alert(err)
            }
        }
        checkSession();
    },[])
 

    return (
        
        <div>
            <ButtonGroup>
                <Button variant="primary" size="lg" onClick={handleShowVacationModal}>
                        Add New
                </Button>
                    <Button variant="primary" size="lg" onClick={handleShowReportModal}>
                        Followers Report
                </Button>
            </ButtonGroup>
            <div className="cards" >
           {vacationsG.map(vacation=> {
           return (
                    <AVacation key={vacation.id} setvacations={setVacations} vacation={vacation}/>
                )
            })}
            </div>
            <VacationModal show={showVacationModal} handleClose={handleCloseVacationModal} type="New" />
            <ReportModal show={showReportModal} handleClose={handleCloseReportModal}  />
            
        </div>
    )
}
