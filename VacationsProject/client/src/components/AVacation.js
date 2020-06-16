import React, { useState,useEffect } from 'react'
import {Card} from 'react-bootstrap'
import VacationModal from './VacationModal';
import Moment from 'react-moment';
export default function AVacation(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handeDelete = async () =>{
        const response = await fetch(`http://localhost:3000/vacations/${props.vacation.id}`,{method:'DELETE'})
        if(response.status===200)
        {
            props.setvacations()
        }
    }
    useEffect(() => {
        
    }, [])
    
    return (
             <Card className="vacationCard" key={props.vacation.id} id={props.vacation.id} style={{ width: '18rem' }}>
               <Card.Img variant="top" src={props.vacation.pic_url} />
               <Card.Body>
                 <Card.Title style = {{'display':'inline-block'}}>{props.vacation.desteny}</Card.Title>
                 <div onClick={handleShow} style = {{'display':'inline-block','position':'absolute','right':'40px'}}><img width="16px" height="16px" alt="missing" src={process.env.PUBLIC_URL+"/edit.png"}></img></div>
                 <div onClick={handeDelete} style = {{'display':'inline-block','position':'absolute','right':'10px'}}><img width="16px" height="16px" alt="missing" src={process.env.PUBLIC_URL+"/delete.png"}></img></div>
                 <Card.Text>
                 {props.vacation.description}
                 </Card.Text>
                 <Card.Text>
                 <Moment format={"DD-MM-YYYY"} date={props.vacation.start_date} /> - <Moment format={"DD-MM-YYYY"} date={props.vacation.end_date}/>
                 {/* {moment(props.vacation.start_date,'DD-MM-YYYY').toString() +"-" +moment(props.vacation.end_date,'DD-MM-YYYY').toString()} */}
                 </Card.Text>
                 <Card.Text>
                 {props.vacation.price}
                 </Card.Text>
               </Card.Body>
               <VacationModal vacation={props.vacation} show={show} handleClose={handleClose} type="Edit" />
            </Card>
            
    )
}
