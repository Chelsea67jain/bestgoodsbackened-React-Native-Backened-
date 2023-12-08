import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap' 
import { useDispatch } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import "./product.css" 

export default function Products(props) { 

    var dispatch=useDispatch()
    var navigate=useNavigate()
    const [productId,setProductId]=useState('')
    const [productName,setProductName]=useState('')
    const [productRate,setProductRate]=useState('')
    
  const handleDisplayClick=()=>{

navigate('/displayall')
  }
  const handleClick=()=>{

     var body={productid:productId,productname:productName,productrate:productRate}
     dispatch({type:'ADD_PRODUCT',payload:[productId,body]})

  }
    return (
        <div className="maincontainer">
            <div className="subcontainer">
                <Form>
                   
                   <div className="heading">
                       Sony Products
                   </div>

                    <Form.Group className="mb-3" >
                        <Form.Label className="labelstyle" >Product Id</Form.Label>
                        <Form.Control onChange={(event)=>setProductId(event.target.value)}  type="text" placeholder="Product Id" />
                                     </Form.Group>

                                     <Form.Group className="mb-3" >
                        <Form.Label className="labelstyle">Product Name</Form.Label>
                        <Form.Control  onChange={(event)=>setProductName(event.target.value)} type="text" placeholder="Product Name" />
                                     </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label className="labelstyle">Product Rate</Form.Label>
                        <Form.Control  onChange={(event)=>setProductRate(event.target.value)}  type="text" placeholder="Product Rate" />
                                         </Form.Group>
                    <div>
                    <Button onClick={handleClick} variant="secondary">Submit</Button>{' '}
                    <Button variant="secondary">Clear</Button>{' '}
                    <Button variant="warning" onClick={handleDisplayClick} >Display All</Button>{' '}
                    </div>
                </Form>
            </div>
           
        </div>
    )
}