import React, { useEffect, useState } from 'react'
import axios from "axios";
import './program.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function UpdateProject() {
  const [projectCode,setProjectCode] = useState("");
  const [projectName,setProjectName] = useState("");
  const [date,setDate] = useState("date")
  const navigate = useNavigate();
  const [ID,setID] = useState(null)

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
  
    
    axios.put(`http://localhost:4000/api/v1/project/${ID}`,learnerData).then((response)=>{
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

  useEffect(()=>{
    setProjectCode(localStorage.getItem("projectCode"));
    setProjectName(localStorage.getItem("projectName"));
    setDate(localStorage.getItem("date"));
    setID(localStorage.getItem("ID"));
  },[])
 
  return (
    <div className='container'>

    <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}> 

<div className="heading text-center">
  <h3>Update Project</h3>
</div>
          <div className="col-md-3">
            
            <input type="text" value={projectCode} className="form-control text-center" placeholder='Project Code' onChange={(e)=>setProjectCode(e.target.value)} />
          </div>
          <div className="col-md-5">
            
            <input type="text" value={projectName} className="form-control text-center" placeholder='Project Name' onChange={(e)=>setProjectName(e.target.value)} />
          </div>
          
          <br /><br />
        
           

          <div className="row">
          <div className="col-md-3">
            <label>Date</label>
            <input type="date" value={date} className="form-control text-center"  onChange={(e)=>setDate(e.target.value)} />
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

export default UpdateProject