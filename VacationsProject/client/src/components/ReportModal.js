import React, { useState, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
export default function ReportModal(props) {
const [data,setData] = useState([])
const colors = scaleOrdinal(schemeCategory10).range();
useEffect(()=>{
    const setDateForChart =  async ()=>{
        const res =await fetch('http://localhost:3000/followers',{method:'GET',credentials: 'include',headers:{'Content-Type': 'application/json'}})
        const json = await res.json()
        setData(json)
    }
    setDateForChart();
}
,[])
    return (

        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
        <BarChart
            width={700}
            height={400}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            data={data}
            maxBarSize={30}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="desteny" />
            <YAxis />
            <Tooltip/>
            <Bar dataKey="followers" fill="#8884d8" label={{ position: 'top' }}>
            {
                data.map((entry, index) => (
                <Cell key={`cell-${index}`}  fill={colors[index % 20]} />
                ))
            }
            </Bar>
        </BarChart>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}
