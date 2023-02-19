import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Table,Button } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Users() {
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
        axios.get(`http://localhost:4000/api/v1/users`).then((getData)=>{
            setApiData(getData.data)
            console.log(getData.data);
        })
    },[])
    const getData =()=>{
        axios.get(`http://localhost:4000/api/v1/users`).then((getData)=>{
            setApiData(getData.data);
            console.log(getData.data);
        })
    };

    const ondelete =(id)=>{
        axios.delete(`http://localhost:4000/api/v1/user/${id}`)
        .then((response)=>{
          if(response.data.success===true){
            toast.success("User Deleted Successfully",{ position: "top-right",theme: "colored",});
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

      const setData = (_id,name,email,password,role)=>{
        localStorage.setItem("ID",_id);
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        localStorage.setItem("role",role);
      }



  return (
    <div>
       <div className='container'>
     <Navbar/>
         <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Name</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Email Id</Table.HeaderCell>
        <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Role</Table.HeaderCell>

      {adminvisible && <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Actions</Table.HeaderCell>}  
     
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {Array.isArray(apiData)
     ? apiData.map(data=>{
      return(
        <Table.Row key={data._id}>
           <Table.Cell>{data.name}</Table.Cell>
           <Table.Cell>{data.email}</Table.Cell>
           <Table.Cell>{data.role}</Table.Cell>
           
            {adminvisible &&
            <Table.Cell>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:15, borderColor:"#FFC300"}} onClick={()=>confDelete(data._id)} >Delete</Button> </span>
              <Link to='/updateUser'>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} onClick={()=>setData(data._id,data.name,data.email,data.password,data.role)} >Update</Button></span>
              </Link>
              </Table.Cell>}
              
        </Table.Row>
      )

     }): null}
    </Table.Body>

   
   
  </Table>
  <Link to="/addUser">
    {adminvisible && <Button className="btn btn-secondary btn-lg">Add User</Button>}
  </Link>
  <ToastContainer />
    </div> 
    </div>
  )
}

export default Users