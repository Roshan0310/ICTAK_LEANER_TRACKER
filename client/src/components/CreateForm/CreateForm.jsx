import React, { useEffect, useState } from 'react'
import axios from "axios";
import './createForm.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

function CreateForm() {
  const navigate = useNavigate();
  const [learnerId,setlearnerId] = useState('');
  const [learnerName,setlearnerName] = useState('');
  const [course,setCourse] = useState('');
  const [batch,setBatch] = useState('');
  const [project,setProject] = useState('');
  const [courseStatus,setcourseStatus] = useState('Incomplete');
  const [placementStatus,setplacementStatus] = useState('Placed');

   
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
      if(learnerId==="" || learnerName===""  || course===""  || batch===""  || project==="" || courseStatus==="" || placementStatus===""  ){
        toast.error("please enter all values",{ position: "top-right",theme: "colored",});
      }
      else{

      
      var token = sessionStorage.getItem("usertoken");
      const learnerData = {
        
        "learnerId":learnerId,
        "learnerName":learnerName,
        "courseName":course,
        "batch":batch,
        "project":project,
        "courseStatus":courseStatus,
        "placementStatus":placementStatus,
        "token":token,
      }
    
      
      axios.post(`http://localhost:4000/api/v1/learner/new`,learnerData).then((response)=>{
        if(response.data.status==="success"){
          
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
   

  return (
    
    <div className='container'>

      <Navbar/>

<form className="row createForm" onSubmit={formHandler} style={{backgroundColor:"gray"}}>

  <div className="heading text-center">
    <h3>Create Learner</h3>
  </div>
            <div className="col-md-3">
              
              <input type="text" className="form-control text-center" placeholder='Learner Id' onChange={(e)=>setlearnerId(e.target.value)} />
            </div>
            <div className="col-md-5">
              
              <input type="text" className="form-control text-center" placeholder='Learner Name' onChange={(e)=>setlearnerName(e.target.value)} />
            </div>
            
            <br /><br /><br />
          <div className="row">
            <div className="col-md-2">
        
              <select  className="form-select text-center" onChange={(e)=>setCourse(e.target.value)} >
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
        
              <select  className="form-select text-center" onChange={(e)=>setBatch(e.target.value)} >
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
        
              <select  className="form-select text-center"  onChange={(e)=>setProject(e.target.value)} >
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
                <select name=""  className='form-select' onChange={(e)=>setcourseStatus(e.target.value)}>
                <option value="none" selected disabled hidden>Course Status</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
              </div>
              <div className="col-md-3">
                <select name="" className='form-select' onChange={(e)=>setplacementStatus(e.target.value)}>
                <option value="none" selected disabled hidden>Placement Status</option>
                  <option value="Placed">Placed</option>
                  <option value="Job Seeking">Job Seeking</option>
                  <option value="Not Interested">Not Interested</option>
                </select>
              </div>
            </div>
            <br /><br /><br />
          
            <div className="col-md-3" >
           
              <button type='submit' className="btn btn-primary form-control btnn ">Submit</button>
            </div>
        </form>
        
        <ToastContainer />
    </div>
    
  )
}

export default CreateForm