import React, { useEffect, useState } from 'react'
import axios from "axios";
import './update.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function PlacementUpdate() {
  const navigate = useNavigate();
  const [learnerId,setlearnerId] = useState('');
  const [learnerName,setlearnerName] = useState('');
  const [course,setCourse] = useState('');
  const [batch,setBatch] = useState('');
  const [project,setProject] = useState('');
  const [courseStatus,setcourseStatus] = useState('Incomplete');
  const [placementStatus,setplacementStatus] = useState('Placed');
  const [ID,setID] = useState(null)

   
    const [apiData, setApiData] = useState([]);
   
    const [batchData,setBatchData] = useState([]);
    
    const [projectData,setProjectData] = useState([]);

    
    //Course GET
    useEffect(()=>{
        getData();
    },[]);

    const getData = ()=>{
        axios.get(`http://localhost:4000/api/v1/courses`).then((getData) => {
            setApiData(getData.data);
            console.log(getData.data);
          });
    };

    //Batch GET

    useEffect(()=>{
      getBatch();
    },[])

    const getBatch = ()=>{
      axios.get(`http://localhost:4000/api/v1/batches`).then((getData) => {
        setBatchData(getData.data);
        console.log(getData.data);
      });
    };

    //Project GET

    useEffect(()=>{
      getProject();
    },[])

    const getProject = ()=>{
      axios.get(`http://localhost:4000/api/v1/projects`).then((getData) => {
        setProjectData(getData.data);
        console.log(getData.data);
      });
    };
    
    const sendDataToApi = ()=>{
      if(placementStatus===""  ){
        toast.error("please enter all values",{ position: "top-right",theme: "colored",});
      }
      else{
      const learnerData = {
        "learnerId":learnerId,
        "learnerName":learnerName,
        "courseName":course,
        "batch":batch,
        "project":project,
        "courseStatus":courseStatus,
        "placementStatus":placementStatus,
        
      }
    
      
      axios.put(`http://localhost:4000/api/v1/learner/${ID}`,learnerData).then((response)=>{
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
              navigate('/home');
              
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
        setlearnerId(localStorage.getItem("learnerId"));
        setlearnerName(localStorage.getItem("learnerName"));
        setCourse(localStorage.getItem("courseName"));
        setBatch(localStorage.getItem("batch"));
        setProject(localStorage.getItem("project"));
        setcourseStatus(localStorage.getItem("courseStatus"));
        setplacementStatus(localStorage.getItem("placementStatus"));
        setID(localStorage.getItem("ID"));
    },[])
   

  return (
    
    <div className='container'>
<Navbar/>
<form className="row createForm" onSubmit={formHandler}>

  <div className="heading text-center">
    <h3>Create Learner</h3>
  </div>
            <div className="col-md-3">
              
              <input type="text" value={learnerId}  className="form-control text-center" disabled placeholder='Learner Id' onChange={(e)=>setlearnerId(e.target.value)} />
            </div>
            <div className="col-md-5">
              
              <input type="text" value={learnerName} className="form-control text-center" disabled placeholder='Learner Name' onChange={(e)=>setlearnerName(e.target.value)} />
            </div>
            
            <br /><br /><br />
          <div className="row">
            <div className="col-md-2">
        
              <select disabled value={course}  className="form-select text-center" onChange={(e)=>setCourse(e.target.value)} >
              <option value="none" selected disabled hidden>Course</option>
                {Array.isArray(apiData)
               ? apiData?.map((data)=>{
                    return(

                            <option value={data.courseName}>{data.courseName}</option>     

                    )
                }): null}
              </select>
             
            </div> 

             <div className="col-md-3">
        
              <select  disabled value={batch} className="form-select text-center" onChange={(e)=>setBatch(e.target.value)} >
              <option value="none" selected disabled hidden>Batch</option>
                {Array.isArray(batchData)
               ? batchData?.map((data)=>{
                    return(

                            <option value={data.batchName}>{data.batchName}</option>     

                    )
                }): null}
              </select>
             
            </div> 

             <div className="col-md-3">
        
              <select disabled value={project} className="form-select text-center"  onChange={(e)=>setProject(e.target.value)} >
              <option value="none" selected disabled hidden>Project</option>
                {Array.isArray(projectData)
               ? projectData?.map((data)=>{
                    return(
                      
                            <option value={data.projectName}>{data.projectName}</option>     

                    )
                }): null}
                
              </select>
             
            </div>  
            </div>
            <br /><br /><br />     

            <div className="row">
              <div className="col-md-3">
                <select name="" disabled  value={courseStatus}  className='form-select' onChange={(e)=>setcourseStatus(e.target.value)}>
                <option value="none" selected disabled hidden>Course Status</option>
                  <option value="Qualified" >Qualified</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
              </div>
              <div className="col-md-3">
                <select name="" className='form-select' value={placementStatus} onChange={(e)=>setplacementStatus(e.target.value)}>
                <option value="none" selected disabled hidden>Placement Status</option>
                  <option value="Placed">Placed</option>
                  <option value="Job Seeking">Job Seeking</option>
                  <option value="Not Interested">Not Interested</option>
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

export default PlacementUpdate