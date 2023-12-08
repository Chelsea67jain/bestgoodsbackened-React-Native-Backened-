import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import { Table,Button,Modal,Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCustomers(props){
    var dispatch=useDispatch();
    var navigate=useNavigate();
    const [show, setShow] = useState(false);
  
   const [customerId,setCustomerId]=useState('')
   const [customerName,setCustomerName]=useState('')
   const [customerCity,setCustomerCity]=useState('')
 const [referesh,setReferesh]=useState(false);

   var customers=useSelector(state=>state.customers)
   //  console.log(Object.keys(customers))
  var  customersValues=Object.values(customers);

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true)
        setCustomerId(item.customerid);
        setCustomerName(item.customername);
        setCustomerCity(item.customercity);

    };

    const handleEdit=()=>{

        var body={customerid:customerId,customername:customerName,customercity:customerCity}
     
        dispatch({type:'EDIT_CUSTOMER',payload:[customerId,body]})

    }
    const handleDelete=(item)=>{

    
        dispatch({type:'DELETE_CUSTOMER',payload:[item.customerid]})
      setReferesh(!referesh)
    }



 const Display=()=>{
    return customersValues.map((item,index)=>{
        return (
            <tr>
                <td>{index+1}</td>
                <td>{item.customerid}</td>
                <td>{item.customername}</td>
                <td>{item.customercity}</td>
               <td><Button variant="info" onClick={()=>handleShow(item)}>Edit</Button>{' '}
             <Button variant="danger" onClick={()=>handleDelete(item)} >Delete</Button>{' '}</td>
               

            </tr>
        )
    })
 }

 const editDialog=()=>{
    return(
<>
    

      <Modal show={show} onHide={handleClose}>
      
        <Modal.Body>
        <div className="maincontainer">
            <div className="subcontainer">
                <div className="heading">
                    Customers List
                </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Id</Form.Label>
                        <Form.Control value={customerId} onChange={(event)=>setCustomerId(event.target.value)} type="text" placeholder="Customer Id" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control value={customerName} onChange={(event)=>setCustomerName(event.target.value)} type="text" placeholder="Customer Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Customer City</Form.Label>
                        <Form.Control value={customerCity} onChange={(event)=>setCustomerCity(event.target.value)} type="text" placeholder="Customer City" />
                    </Form.Group>

                   

                    <Button variant="secondary" onClick={handleEdit} >Edit</Button>{' '}
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>{' '}
                  

                </Form>
            </div>
        </div>
        </Modal.Body>
    
      </Modal>
    </>
    )
 }

 return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
<div style={{width:'50%'}}>
  <Table striped bordered hover size="sm">
      <thead>
        <div><h4>Customers List</h4></div>
        <tr>
          <th>#</th>
          <th>Customer Id</th>
          <th>Customer Name</th>
          <th>Customer City</th>
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