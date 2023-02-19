import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table,Button, Pagination } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import "./home.css"
import Footer from '../Footer/Footer';
import {MDBBtn} from "mdb-react-ui-kit"




function Home() {
    const [apiData,setApiData] = useState([]);
    const[adminvisible,setAdminVisible] = useState(false);
    const [PlacementVisible,setPlacementVisible]= useState(false);
    const [value,setValue] = useState([]);
   

  
    useEffect(()=>{
        let role = sessionStorage.getItem("role");
        if(role ==="Admin" || role==="Training Head"){
            setAdminVisible(true)
        }
        else{
            setAdminVisible(false)
        }
        axios.get(`http://localhost:4000/api/v1/learners`).then((getData)=>{
            setApiData(getData.data)
        })
    },[])

    useEffect(()=>{
      let role = sessionStorage.getItem("role");
      if(role ==="Placement Officer"){
        setPlacementVisible(true)
    }
    else{
        setPlacementVisible(false)
    }
    axios.get(`http://localhost:4000/api/v1/learners`,{
      params:{
        page:1,
        

      }
    }).then((getData)=>{
        setApiData(getData.data)
    })
    },[])

    const getData =()=>{
        axios.get(`http://localhost:4000/api/v1/learners`).then((getData)=>{
            setApiData(getData.data);
            console.log(getData.data);
        })
    };

    const ondelete =(id)=>{
      axios.delete(`http://localhost:4000/api/v1/learner/${id}`)
      .then((response)=>{
        if(response.data.success===true){
          toast.success("Learner Deleted Successfully",{ position: "top-right",theme: "colored",});
        getData();
        }
        else{
          toast.error("Something went Wrong",{ position: "top-right",theme: "colored",});
        }
      })
    }

    const confDelete =(id)=>{
      Swal.fire({
        title: 'Are you sure want delete this learner?',
        showDenyButton: true,
        
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Deleted Successfully', '', 'success');
          ondelete(id)
        } else if (result.isDenied) {
          Swal.fire('Cancelled', '', 'info')
        }
      })
    }

    const handleSearch =  async (e)=>{
      e.preventDefault();
      return await axios.get(`http://localhost:4000/api/v1/learners?${value}=`)
       .then((response) => {
        setApiData(response.data);
        setValue("");
       })
       .catch((err)=> console.log(err))
    }

    const handlePageClick = async ()=>{
      axios.get(`http://localhost:4000/api/v1/learners?page=2`).then((getData)=>{
            setApiData(getData.data);
            console.log(getData.data);
        })

        let currentPage = getData.data + 1

        const comments = await getData(currentPage)

        setApiData(comments)
    }
    

    const setData = (id,learnerId,learnerName,courseName,project,batch,courseStatus,placementStatus)=>{
      localStorage.setItem("ID",id);
      localStorage.setItem("learnerId",learnerId);
      localStorage.setItem("learnerName",learnerName);
      localStorage.setItem("courseName",courseName);
      localStorage.setItem("project",project);
      localStorage.setItem("batch",batch);
      localStorage.setItem("courseStatus",courseStatus);
      localStorage.setItem("placementStatus",placementStatus);
    }
   

  


    
  return (
    <div>
    <div className='container'>
     <Navbar/>
     <form style={{
      margin:"auto",
      padding:"15px",
      maxWidth:"400px",
      alignContent:"center"
   }} className="d-flex input-group w-auto" onSubmit={handleSearch}>
    <input type="text" className='form-control' placeholder='Search learner' value={value} onChange={(e)=> setValue(e.target.value)} />
    
      <MDBBtn type='submit' color='dark'>Search</MDBBtn>
      <MDBBtn className='mx-2' color='info' >Reset</MDBBtn>
      
      
     </form>
     <div className="row1">
      <Link to="/create">
    {adminvisible && <Button className="btn btn-secondary btn11 btn-lg">Add Learner</Button>}
  </Link>
      </div>
         <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Learner Id</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Learner Name</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Course Name</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Project</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>batch</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Course Status</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Placement Status</Table.HeaderCell>
      {adminvisible && <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Actions</Table.HeaderCell>}  
      {PlacementVisible && <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}} >Actions</Table.HeaderCell>}
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {Array.isArray(apiData)
     ? apiData.map(data=>{
      return(
        <Table.Row key={data.id}>
           <Table.Cell>{data.learnerId}</Table.Cell>
           <Table.Cell>{data.learnerName}</Table.Cell>
           <Table.Cell>{data.courseName}</Table.Cell>
           <Table.Cell>{data.project}</Table.Cell>
           <Table.Cell>{data.batch}</Table.Cell>
           <Table.Cell>{data.courseStatus}</Table.Cell>
           <Table.Cell>{data.placementStatus}</Table.Cell>
            {adminvisible &&
            <Table.Cell>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:15, borderColor:"#FFC300"}} onClick={()=>confDelete(data._id)} >Delete</Button> </span>
              <Link to='/update'>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} onClick={()=>setData(data._id,data.learnerId,data.learnerName,data.courseName,data.project,data.batch,data.courseStatus,data.placementStatus)} >Update</Button></span>
              </Link>
              </Table.Cell>}
              {PlacementVisible &&
               <Table.Cell>
               <Link to='/placementUpdate'>
               <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} onClick={()=>setData(data._id,data.learnerId,data.learnerName,data.courseName,data.project,data.batch,data.courseStatus,data.placementStatus)} >Update</Button></span>
               </Link>
               </Table.Cell>
              }
        </Table.Row>
      )

     }): null}
    </Table.Body>

   
   
  </Table>
  

  <ToastContainer />
  
    </div>

   
<div className="paginationBox">
<Pagination
totalPages={3}
onPageChange={handlePageClick}
boundaryRange={1}
/>
</div>
    <Footer/>
    </div>
  )
}

export default Home