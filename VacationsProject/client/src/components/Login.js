import { Form, Button, Modal } from 'react-bootstrap'
import React, { useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import allActions from '../Actions/allActions'
const Login = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    const dispatch = useDispatch()
    
    const submitRequest = async () => {
        //1. try to perform login
        let response = await fetch('http://localhost:3000/users/login',{method:'POST',credentials: 'include',body:JSON.stringify({username,password}),headers:{'Content-Type': 'application/json'}})
        let isAdmin = await fetch(`http://localhost:3000/users/isadmin/${username}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
        isAdmin = await isAdmin.json()
        //2. set state
        if(response.status === 200){
            try{
                response = await fetch(`http://localhost:3000/vacations/username/${username}`,{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
                let json = await response.json()
                dispatch(allActions.actionUser.setUser([username,isAdmin]))
                dispatch(allActions.actionVacations.setVacations(json))
                if(isAdmin===0)
                    props.history.push('/vacationsuser')
                else
                    props.history.push('/vacationsadmin')
            }
            catch (err){
                console.log(err);
            }
        }
        else{
            alert('create account or please enter correct details.')
            return;
        }
        //3. redirect to vacations
    } 
    
    useEffect(() => {
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
                    if(isAdmin.admin===0)
                        props.history.push('/vacationsuser')
                    else
                        props.history.push('/vacationsadmin')
                }
            }catch(err){
                alert(err)
            }

        }
        checkSession();
    }, []) 
    return (

        <div className="loginDiv">
            <h1>Welcome to My Flight !</h1>
            <div className="styling">

                <div className="formDiv">

                    <Form>
                        <div className="insideForm">

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(e)=>{setUsername(e.target.value)}} className="input1" type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e)=>{setPassword(e.target.value)}} className="input1" type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Text className="text-muted">
                                don't have an account ? press "Register" and let's get started !
                            </Form.Text>
                            <Button className="btnSub" variant="outline-primary" type="button" onClick={submitRequest}>
                                Login
                            </Button>
                            <Button onClick={handleShow} variant="outline-secondary" type="button">
                                Register
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="modalDiv">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Form>
                            <Form.Group controlId="formBasicEmail">
                                <div>
                                    <Form.Label className="inputPos1" >First name :</Form.Label>
                                    <Form.Label className="inputPos2">Last name :</Form.Label>
                                </div>
                                <Form.Control className="input2" type="email" placeholder="first name" />
                                <Form.Control className="input3" type="email" placeholder="last name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                        </Form></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Login;