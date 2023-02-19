import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Table,Button } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Course() {
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
        axios.get(`http://localhost:4000/api/v1/courses`).then((getData)=>{
            setApiData(getData.data)
            console.log(getData.data);
        })
    },[])
    const getData =()=>{
        axios.get(`http://localhost:4000/api/v1/courses`).then((getData)=>{
            setApiData(getData.data);
            console.log(getData.data);
        })
    };

    const ondelete =(id)=>{
        axios.delete(`http://localhost:4000/api/v1/course/${id}`)
        .then((response)=>{
          if(response.data.success===true){
            toast.success("Course Deleted Successfully",{ position: "top-right",theme: "colored",});
          getData();
          }
          else{
            toast.error("Something went Wrong",{ position: "top-right",theme: "colored",});
          }
        })
      }
  
      const confDelete =(id)=>{
        Swal.fire({
          title: 'Are you sure want delete this Course?',
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

      const setData = (id,courseCode,courseName,date)=>{
        localStorage.setItem("ID",id);
        localStorage.setItem("courseCode",courseCode);
        localStorage.setItem("courseName",courseName);
        localStorage.setItem("date",date);
      
      }



  return (
    <div>
       <div className='container'>
     <Navbar/>
         <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Course Code</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Course Name</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Date</Table.HeaderCell>

      {adminvisible && <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Actions</Table.HeaderCell>}  
     
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {Array.isArray(apiData)
     ? apiData.map(data=>{
      return(
        <Table.Row key={data.id}>
           <Table.Cell>{data.courseCode}</Table.Cell>
           <Table.Cell>{data.courseName}</Table.Cell>
           <Table.Cell>{data.date}</Table.Cell>
           
            {adminvisible &&
            <Table.Cell>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:15, borderColor:"#FFC300"}} onClick={()=>confDelete(data._id)} >Delete</Button> </span>
              <Link to='/updateCourse'>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} onClick={()=>setData(data._id,data.courseCode,data.courseName,data.date)} >Update</Button></span>
              </Link>
              </Table.Cell>}
              
        </Table.Row>
      )

     }): null}
    </Table.Body>

   
   
  </Table>
  <Link to="/addCourse">
    {adminvisible && <Button className="btn btn-secondary btn-lg">Add Course</Button>}
  </Link>
  <ToastContainer />
    </div> 
    </div>
  )
}

export default Course