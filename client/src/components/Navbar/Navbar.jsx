import React, { useEffect, useState } from 'react'
import "./navbar.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import img from "../assets/ictak.png"

function Navbar() {
    const user = sessionStorage.getItem("name")
    const navigate = useNavigate();
    const[adminvisible,setAdminVisible] = useState(false)

    function logOut(){
        sessionStorage.clear()
        navigate("/")
    }
    
    

   

    useEffect(()=>{
        let role = sessionStorage.getItem("role");
        if(role ==="Admin"){
            setAdminVisible(true)
        }
        else{
            setAdminVisible(false)
        }
    },[])
  return (
    <div>


<header>

  <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse " style={{backgroundColor:"lightgray"}}>
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4 ">
        
       
        
        <ul id="collapseExample1" class="collapse show list-group list-group-flush ul-listt ">
        
          <Link to="/home">
          
          <li class="list-group-item py-1">
            <a href='/home' class="text-reset"><i class="fa-solid fa-table-columns"></i>Dashboard</a>
          </li>
          </Link>

{adminvisible &&
          <Link to="/course">
          <li class="list-group-item py-1">
            <a href='/course' class="text-reset"><i class="fa-solid fa-book"></i>Courses</a>
          </li>
          </Link>
}
{adminvisible &&
          <Link to="/batches">
          <li class="list-group-item py-1">
            <a href='/batches' class="text-reset"><i class="fa-solid fa-restroom"></i>Batches</a>
          </li>
          </Link>
}
{adminvisible &&
          <Link to="/programs">
          <li class="list-group-item py-1">
            <a href='/programs' class="text-reset"><i class="fa-solid fa-bars-progress"></i> <br /> Project</a>
          </li>
          </Link>
}
{adminvisible &&
          
          <Link to="/users">
          <li class="list-group-item py-1">
            <a href='/users' class="text-reset"><i class="fa-solid fa-user"></i> <br/>Users</a>
          </li>
          </Link>
}
        </ul>

      </div>
    </div>
  </nav>
 

 
  <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light  fixed-top" >
    
    <div class="container-fluid">
      
      

      <a class="navbar-brand" href='/'>
        
      <div style={{fontSize:15}}>
      <img src={img} alt="ICTAK Logo" style={{width:"50px",height:"45px",borderRadius:"15px",padding:"1px"}}/>
          	ICTAK Learner Tracker
          </div>
      </a>

      <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse  nav1" id="navbarNav">
            <ul class="navbar-nav ms-auto">
            <NavDropdown title={user}  style={{marginLeft: "-7rem",fontSize:20,fontWeight:'bold',marginTop:"1.3rem",color:"#ffffff"}}>
                <NavDropdown.Item onClick={logOut} style={{color:"#581845",fontSize:"20px"}}><Icon.Lock color="#581845" size={20} /> Logout</NavDropdown.Item>
          </NavDropdown>
             
            </ul>
{/* 
            <div style={{marginLeft: "-11rem",marginTop:"-1.8rem",fontSize:15,fontWeight:'bold'}}>
          	Logout
          </div> */}
          </div>

          
      

     
     
      
    </div>
   
  </nav>
 
</header>



<main style={{marginTop:"58px"}}>
  <div class="container pt-4"></div>
</main>






    </div>
  )
}

export default Navbar