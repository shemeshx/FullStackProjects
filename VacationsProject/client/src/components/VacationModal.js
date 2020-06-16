
import React, { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { useForm } from 'react-hook-form';

export default function VacationModal(props) {
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [vacation,setVacation] = useState({})
     const { register, handleSubmit } = useForm(); // initialise the hook
    useEffect(()=>{
        if(props.vacation){  
            setVacation(props.vacation)
            changeStartDate(new Date(vacation.start_date))
            changeEndDate(new Date(vacation.end_date))    
        }  
    },[props.vacation,vacation])
    const changeStartDate = (date)=>{setStartDate(date)}
    const changeEndDate = (date)=>{setEndDate(date)}

    const onSubmit = (data) => {
        const body = {
            desteny:data.dest,
            price:data.price,
            pic_url:data.image,
            description:data.desc,
            start_date:moment(startDate).format("YYYY-MM-DD"),
            end_date:moment(endDate).format("YYYY-MM-DD")}
            
        switch(props.type){
            case "Edit": 
                        fetch(`http://localhost:3000/vacations/${vacation.id}`,{method:'PUT',body:JSON.stringify(body),headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        }}).then(res=>{console.log(res);alert('yay! you edit the trip!')}).catch(err=>alert("error occured!"))
                break;
            case "New":
                        fetch(`http://localhost:3000/vacations/`,{method:'POST',body:JSON.stringify(body),headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }}).then(res=>alert('yay! you add new trip!')).catch(err=>alert("error occured!"))  
                break;
        }
        
      };
    return (
        <div>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.type} Vacation!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="vacationId">
                        <Form.Label>vacationID</Form.Label>
                        <Form.Control name="id" type="text" defaultValue={vacation.id} ref={register} disabled/>
                    </Form.Group>
                    <Form.Group controlId="vacationdest">
                        <Form.Label>Destionation</Form.Label>
                        <Form.Control name="dest" type="text"  defaultValue={vacation.desteny} ref={register}/>
                    </Form.Group>
                    <Form.Group controlId="vacationPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="text"  defaultValue={vacation.price} ref={register}/>
                    </Form.Group>
                    <Form.Group controlId="vacationImage" >
                        <Form.Label>image</Form.Label>
                        <Form.Control name="image" type="url" defaultValue={vacation.pic_url} ref={register}/>
                    </Form.Group>
                    <Form.Group controlId="vacationDesc" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="desc" type="text" defaultValue={vacation.description} ref={register}/>
                    </Form.Group>
                    <Form.Group controlId="vacationStartDate">
                        <Form.Label>Start Date </Form.Label>
                        <span> </span>
                        <DatePicker
                            selected={startDate}
                            onChange={changeStartDate}
                        />
                    </Form.Group>
                    <Form.Group controlId="vacationStartDate">
                        <Form.Label>End Date </Form.Label>
                        <span> </span>
                        <DatePicker
                            selected={endDate}
                            onChange={changeEndDate}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}> 
                    {props.type}
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
