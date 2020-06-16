import React, { useState,useEffect } from 'react'
import {Card} from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {useSelector} from 'react-redux'

export default function RVacation(props) {
    
    const username = useSelector(state=>state.user)
    const [checked,setChecked] = useState(false)
   
    const checkFollow = async (id)=>{
        let json = await fetch(`http://localhost:3000/followers/${username[0]}/${id}`)
        let result = await json.json();
        setChecked(result.result)
    }
    const handleChange=async(e)=>{
        if (!checked){ //follow
            let res = await fetch(`http://localhost:3000/followers/follow`,{method:'POST',body:JSON.stringify({username:username[0],vacation_id:props.vacation.id}),headers:{'Content-Type':'application/json'}})
            console.log(res)
            if(res.status===200){
                setChecked(!checked)
                
            }
            else
                console.log("follow didnt succeed")
        }
        else{ //unfollow
            let res = await fetch(`http://localhost:3000/followers/unfollow`,{method:'DELETE',body:JSON.stringify({username:username[0],vacation_id:props.vacation.id}),headers:{'Content-Type':'application/json'}})
            if(res.status===200){
                setChecked(!checked)
            }
            else
                console.log("unfollow didnt succeed")
        }
        props.setvacations()
    }
    
    useEffect(() => {
        checkFollow(props.vacation.id)
    }, [props.vacation.id])
    
    return (
        
             <Card className="vacationCard" key={props.vacation.id} id={props.vacation.id} style={{ width: '18rem' }}>
               <Card.Img variant="top" src={props.vacation.pic_url} />
               <Card.Body>
                 <Card.Title>{props.vacation.desteny}</Card.Title>
                 <Card.Text>
                 {props.vacation.description}
                 </Card.Text>
                 <Card.Text>
                 {props.vacation.start_date +"-" +props.vacation.end_date}
                 </Card.Text>
                 <Card.Text>
                 {props.vacation.price}
                 </Card.Text>
               </Card.Body>
               <BootstrapSwitchButton checked={checked} onChange={handleChange}></BootstrapSwitchButton>
            </Card>
       
    )
}
