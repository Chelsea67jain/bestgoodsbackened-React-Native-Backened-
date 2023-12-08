import React, { useState, useEffect } from "react";
import { Form, Button ,Image} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './customer.css'

export default function Customers(props) { 
    var dispatch=useDispatch();
  var navigate=useNavigate();
 const [customerId,setCustomerId]=useState('')
 const [customerName,setCustomerName]=useState('')
 const [customerCity,setCustomerCity]=useState('')


    const handleClick=()=>{

        var body={customerid:customerId,customername:customerName,customercity:customerCity}
      console.log(body);
        dispatch({type:'ADD_CUSTOMER',payload:[customerId,body]})

    }

const handleDisplayCustomers=()=>{
    navigate('/displayallcustomers')
}

    return (
        <div className="maincontainer">
            <div className="subcontainer">
                <div className="heading">
                    Customers List
                </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Id</Form.Label>
                        <Form.Control onChange={(event)=>setCustomerId(event.target.value)} type="text" placeholder="Customer Id" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control onChange={(event)=>setCustomerName(event.target.value)} type="text" placeholder="Customer Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Customer City</Form.Label>
                        <Form.Control  onChange={(event)=>setCustomerCity(event.target.value)} type="text" placeholder="Customer City" />
                    </Form.Group>

                   

                    <Button variant="secondary" onClick={handleClick}>Submit</Button>{' '}
                    <Button variant="secondary">Clear</Button>{' '}
                    <Button variant="warning" onClick={handleDisplayCustomers} >Display All Customers</Button>{' '}

                </Form>
                
            </div>
        </div>
    )
}