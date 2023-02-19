import React, { useEffect, useState } from 'react'
import axios from "axios";
import './user.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function UpdateUser() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("user");
  const navigate = useNavigate();
  const [ID,setID] = useState(null)

  const sendDataToApi = ()=>{
    if(name==="" || email===""  || role==="" || password===""){
      toast.error("please enter all values",{ position: "top-right",theme: "colored",});
    }
    else{

    
    
    const learnerData = {
      
      "name":name,
      "email":email,
      "password":password,
      "role":role,
     
    }
  
    
    axios.put(`http://localhost:4000/api/v1/user/${ID}`,learnerData).then((response)=>{
      if(response.data.success===true){
        
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            navigate('/users');
            
          } else if (result.isDenied) {
            
            
          }
        })
        
        
      }
      else{
        alert("Error");
       
      }
    })
    }
  }

  const formHandler = (e)=>{
    e.preventDefault()
    sendDataToApi()
    
  }

  useEffect(()=>{
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
    setRole(localStorage.getItem("role"));
    setID(localStorage.getItem("ID"));
},[])

 
  return (
    <div className='container'>

    <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}>

<div className="heading text-center">
  <h3>Update User</h3>
</div>
          <div className="col-md-3">
            
            <input type="text" value={name} className="form-control text-center" placeholder='User Name' onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="col-md-5">
            
            <input type="email" value={email} className="form-control text-center" placeholder='Email Id' onChange={(e)=>setEmail(e.target.value)} />
          </div>
          
          <br /><br /><br />
        
           

          <div className="row">
          <div className="col-md-3">
            
            <input type="password" value={password} className="form-control text-center" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
          </div>
            <div className="col-md-3">
              <select name="" value={role}  className='form-select' onChange={(e)=>setRole(e.target.value)}>
              <option value="none" selected disabled hidden>Select Role</option>
                <option value="Placement Officer">Placement Officer</option>
                <option value="Training Head">Training Head</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
           
          </div>
          <br /><br /><br />
        
          <div className="col-md-3" >
         
            <button type='submit' className="btn btn-primary form-control ">Submit</button>
          </div>
      </form>
      
      <ToastContainer />
  </div>
  )
}

export default UpdateUser