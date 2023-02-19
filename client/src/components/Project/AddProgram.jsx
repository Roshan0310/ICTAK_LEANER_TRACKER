import React, { useState } from 'react'
import axios from "axios";
import './program.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function AddProgram() {
  const [projectCode,setProjectCode] = useState("");
  const [projectName,setProjectName] = useState("");
  const [date,setDate] = useState("date")
    const navigate = useNavigate();

  const sendDataToApi = ()=>{
    if(projectCode==="" || projectName===""  || date==="" ){
      toast.error("please enter all values",{ position: "top-right",theme: "colored",});
    }
    else{

    
    
    const learnerData = {
      
      "projectCode":projectCode,
      "projectName":projectName,
      "date":date,
      
     
    }
  
    
    axios.post(`http://localhost:4000/api/v1/project/new`,learnerData).then((response)=>{
      if(response.data.success===true){
        
        Swal.fire({
          title: 'Return to Dashboard?',
          showDenyButton: true,
          
          confirmButtonText: 'Yes',
          denyButtonText: `Add More`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            navigate('/programs');
            
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
 
  return (
    <div className='container'>

    <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}>

<div className="heading text-center">
  <h3>Create Project</h3>
</div>
          <div className="col-md-3">
            
            <input type="text" className="form-control text-center" placeholder='Project Code' onChange={(e)=>setProjectCode(e.target.value)} />
          </div>
          <div className="col-md-5">
            
            <input type="text" className="form-control text-center" placeholder='Project Name' onChange={(e)=>setProjectName(e.target.value)} />
          </div>
          
          <br /><br />
        
           

          <div className="row">
          <div className="col-md-3">
            <label>Date</label>
            <input type="date" className="form-control text-center"  onChange={(e)=>setDate(e.target.value)} />
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

export default AddProgram