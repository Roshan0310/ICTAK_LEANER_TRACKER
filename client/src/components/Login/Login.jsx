import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const useAuthentication = ()=>{
      if(email===""){
        toast.error("Please enter email",{ position: "top-right",theme: "colored",});
      }if(password===""){
        toast.error("Please enter Password",{ position: "top-right",theme: "colored",});
      }
      else{
        const userData = {
          email:email,
          password:password
      }
      console.log(userData);
      axios.post(`http://localhost:4000/api/v1/login`,userData)
      .then((response)=>{
          console.log(response.data);

          if (response.data.status === "success") {
              let token = response.data.token;
              let userId = response.data.data[0]._id;
              let role = response.data.data[0].role;
              let name = response.data.data[0].name;
    
              sessionStorage.setItem("usertoken", token);
              sessionStorage.setItem("userId", userId);
              sessionStorage.setItem("role", role);
              sessionStorage.setItem("name",name);
              navigate("/home");
              toast.success("Wow so easy!",{ position: "top-right",theme: "colored",});
            } else {
              toast.error("Invalid Login Credentials",{ position: "top-right",theme: "colored",});
            }
          
      })
      }  
    }
  return (
    <div>
       
       <section class="vh-100 gradient-custom">
  <div class="container-fluid py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bb-light " style={{width:"500px",borderRadius:"20px"}} >
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h1 class="fw-bold mb-2 text-uppercase" style={{fontSize:"40px"}}>USER LOGIN</h1>
              <p class=" mb-5">Please enter your login and password!</p>

              <div class="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" class="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                <label class="form-label" for="typeEmailX" style={{color:"rgb(7, 216, 146)",fontSize:"20px"}}>Email</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                <label class="form-label" for="typePasswordX" style={{color:"rgb(7, 216, 146)",fontSize:"20px"}}>Password</label>
              </div>

              

              <button class="btn btn-outline-light btn-lg px-5" type="button" style={{backgroundColor:"rgb(7, 216, 146)",fontSize:"25px"}}  onClick={useAuthentication}>Login</button>

              <div class="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
              </div>

            </div>

            <div>
              
             
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<ToastContainer />
    </div>
  )
}

export default Login