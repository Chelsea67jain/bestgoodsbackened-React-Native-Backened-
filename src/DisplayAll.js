import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Table,Button,Modal,Form } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'
import "./product.css" 

export default function DisplayAll(props) {
  const [show, setShow] = useState(false);
  var dispatch=useDispatch()
    var navigate=useNavigate()
    const [productId,setProductId]=useState('')
    const [productName,setProductName]=useState('')
    const [productRate,setProductRate]=useState('')
    const [referesh,setReferesh]=useState(false);

  const handleClose = () =>{ setShow(false)};

  const handleShow = (item) =>{

   setShow(true);
   setProductId(item.productid)
   setProductName(item.productname);
   setProductRate(item.productrate);

  }
  const handleEdit=()=>{

    var body={productid:productId,productname:productName,productrate:productRate}
    dispatch({type:'EDIT_PRODUCT',payload:[productId,body]})

 }

 const handleDelete=(item)=>{

  dispatch({type:'DELETE_PRODUCT',payload:[item.productid]})
  setReferesh(!referesh)
}

  var products = useSelector(state => state.products)
  // console.log(Object.keys(products))
  // console.log(Object.values(products))
  var productsValues = Object.values(products)
  
  function editDialog() {
  
    return (
      <>
       
  
        <Modal show={show} onHide={handleClose}>
          
          <Modal.Body>
          <div className="maincontainer">
            <div className="subcontainer">
                <Form>
                   
                   <div className="heading">
                       Sony Products
                   </div>

                    <Form.Group className="mb-3" >
                        <Form.Label className="labelstyle" >Product Id</Form.Label>
                        <Form.Control value={productId} onChange={(event)=>setProductId(event.target.value)}  type="text" placeholder="Product Id" />
                                     </Form.Group>

                                     <Form.Group className="mb-3" >
                        <Form.Label className="labelstyle">Product Name</Form.Label>
                        <Form.Control value={productName} onChange={(event)=>setProductName(event.target.value)} type="text" placeholder="Product Name" />
                                     </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label className="labelstyle">Product Rate</Form.Label>
                        <Form.Control value={productRate}  onChange={(event)=>setProductRate(event.target.value)}  type="text" placeholder="Product Rate" />
                                         </Form.Group>
                    <div>
                    <Button  variant="secondary" onClick={handleEdit}>Edit</Button>{' '}
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>{' '}
                  
                    </div>
                </Form>
            </div>
           
        </div>
    

          </Modal.Body>
          
        </Modal>
      </>
    );
  }
  

  const Display = () => {
    return productsValues.map((item, index) => {
      return (

        <tr>
          <td>{index + 1}</td>
          <td>{item.productid}</td>
          <td>{item.productname}</td>
          <td>{item.productrate}</td>
          <td> 
            <Button variant="info" onClick={()=>handleShow(item)}>Edit</Button>{' '}
             <Button variant="danger" onClick={()=>handleDelete(item)}>Delete</Button>{' '}
           </td>
        </tr>

      )
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div style={{ width: '50%' }}>
        <Table striped bordered hover>

          <thead>
            <div><h5>List of Products</h5></div>
            <tr>
              <th>#</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Rate</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {Display()}
          </tbody>
        </Table>
      </div>
      {editDialog()}
    </div>
  )
}

