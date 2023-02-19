import React, { useEffect, useState } from 'react'
import axios from "axios";
import './course.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function UpdateCourse() {
  const [courseCode,setCourseCode] = useState("");
  const [courseName,setcourseName] = useState("");
  const [date,setDate] = useState("date")
    const navigate = useNavigate();
    const [ID,setID] = useState(null)

  const sendDataToApi = ()=>{
    if(courseCode==="" || courseName===""  || date==="" ){
      toast.error("please enter all values",{ position: "top-right",theme: "colored",});
    }
    else{

    
    
    const learnerData = {
      
      "courseCode":courseCode,
      "courseName":courseName,
      "date":date,
      
     
    }
  
    
    axios.put(`http://localhost:4000/api/v1/course/${ID}`,learnerData).then((response)=>{
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
            navigate('/course');
            
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
    setCourseCode(localStorage.getItem("CourseCode"));
    setcourseName(localStorage.getItem("CourseName"));
    setDate(localStorage.getItem("date"));
    setID(localStorage.getItem("ID"));
  },[])
 
  return (
    <div className='container'>

    <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}>

<div className="heading text-center">
  <h3>Update Course</h3>
</div>
          <div className="col-md-3">
            
            <input type="text" className="form-control text-center" placeholder='Course Code' onChange={(e)=>setCourseCode(e.target.value)} />
          </div>
          <div className="col-md-5">
            
            <input type="text" className="form-control text-center" placeholder='Course Name' onChange={(e)=>setcourseName(e.target.value)} />
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

export default UpdateCourse