import React, { useEffect, useState } from 'react'
import axios from "axios";
import './batch.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function UpdateBatch() {
  const [batchCode,setBatchCode] = useState("");
  const [batchName,setBatchName] = useState("");
  const [date,setDate] = useState("date")
    const navigate = useNavigate();
    const [ID,setID] = useState(null)

  const sendDataToApi = ()=>{
    if(batchCode==="" || batchName===""  || date==="" ){
      toast.error("please enter all values",{ position: "top-right",theme: "colored",});
    }
    else{

    
    
    const learnerData = {
      
      "batchCode":batchCode,
      "batchName":batchName,
      "date":date,
      
     
    }
  
    
    axios.put(`http://localhost:4000/api/v1/batch/${ID}`,learnerData).then((response)=>{
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
            navigate('/batches');
            
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
    setBatchCode(localStorage.getItem("BatchCode"));
    setBatchName(localStorage.getItem("BatchName"));
    setDate(localStorage.getItem("date"));
    setID(localStorage.getItem("ID"));
  },[])
 
  return (
    <div className='container'>

    <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}>

<div className="heading text-center">
  <h3>Create Learner</h3>
</div>
          <div className="col-md-3">
            
            <input type="text" value={batchCode} className="form-control text-center" placeholder=' Batch Code' onChange={(e)=>setBatchCode(e.target.value)} />
          </div>
          <div className="col-md-5">
            
            <input type="text" value={batchName} className="form-control text-center" placeholder='Batch Name' onChange={(e)=>setBatchName(e.target.value)} />
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

export default UpdateBatch