import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Table,Button } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Program() {
    const [apiData,setApiData] = useState({});
    const[adminvisible,setAdminVisible] = useState(false);

    useEffect(()=>{
        let role = sessionStorage.getItem("role");
        if(role ==="Admin"){
            setAdminVisible(true)
        }
        else{
            setAdminVisible(false)
        }
        axios.get(`http://localhost:4000/api/v1/projects`).then((getData)=>{
            setApiData(getData.data)
            console.log(getData.data);
        })
    },[])
    const getData =()=>{
        axios.get(`http://localhost:4000/api/v1/projects`).then((getData)=>{
            setApiData(getData.data);
            console.log(getData.data);
        })
    };

    const ondelete =(_id)=>{
        axios.delete(`http://localhost:4000/api/v1/project/${_id}`)
        .then((response)=>{
          if(response.data.success===true){
            toast.success("Project Deleted Successfully",{ position: "top-right",theme: "colored",});
          getData();
          }
          else{
            toast.error("Something went Wrong",{ position: "top-right",theme: "colored",});
          }
        })
      }
  
      const confDelete =(_id)=>{
        Swal.fire({
          title: 'Are you sure want delete this Project?',
          showDenyButton: true,
          
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Deleted Successfully', '', 'success');
            ondelete(_id)
          } else if (result.isDenied) {
            Swal.fire('Cancelled', '', 'info')
          }
        })
      }

      const setData = (_id,projectCode,projectName,date)=>{
        localStorage.setItem("ID",_id);
        localStorage.setItem("projectCode",projectCode);
        localStorage.setItem("projectName",projectName);
        localStorage.setItem("date",date);
      }



  return (
    <div>
       <div className='container'>
     <Navbar/>
         <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Project Code</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Project Name</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Date</Table.HeaderCell>

      {adminvisible && <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Actions</Table.HeaderCell>}  
     
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {Array.isArray(apiData)
     ? apiData.map(data=>{
      return(
        <Table.Row key={data._id}>
           <Table.Cell>{data.projectCode}</Table.Cell>
           <Table.Cell>{data.projectName}</Table.Cell>
           <Table.Cell>{data.date}</Table.Cell>
           
            {adminvisible &&
            <Table.Cell>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:15, borderColor:"#FFC300"}} onClick={()=>confDelete(data._id)} >Delete</Button> </span>
              <Link to='/updateProject'>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} onClick={()=>setData(data._id,data.projectCode,data.projectName,data.date)} >Update</Button></span>
              </Link>
              </Table.Cell>}
              
        </Table.Row>
      )

     }): null}
    </Table.Body>

   
   
  </Table>
  <Link to="/addProgram">
    {adminvisible && <Button className="btn btn-secondary btn-lg">Add Project</Button>}
  </Link>
  <ToastContainer />
    </div> 
    </div>
  )
}

export default Program