
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CreateForm from './components/CreateForm/CreateForm';
import Update from './components/Update/Update';
import Users from './components/Users/Users';
import Course from './components/Courses/Course';
import Batches from './components/Batches/Batches';
import Program from './components/Project/Program';
import AddUser from './components/Users/AddUser';
import UpdateUser from './components/Users/UpdateUser';
import AddProgram from './components/Project/AddProgram';
import UpdateProject from './components/Project/UpdateProject';
import CreateCourse from './components/Courses/CreateCourse';
import UpdateCourse from './components/Courses/UpdateCourse';
import CreateBatch from './components/Batches/CreateBatch';
import UpdateBatch from './components/Batches/UpdateBatch';
import PlacementUpdate from './components/Update/PlacementUpdate';
import Upload from './components/FileUpload/Upload';








function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<CreateForm/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/placementUpdate' element={<PlacementUpdate/>}/>

        <Route path='/users' element={<Users/>}/>
        <Route path='/addUser' element={<AddUser/>}/>
        <Route path='/updateUser' element={<UpdateUser/>}/>
        

        <Route path='/course' element={<Course/>}/>
        <Route path='/addCourse' element={<CreateCourse/>}/>
        <Route path='/updateCourse' element={<UpdateCourse/>}/>



        <Route path='/batches' element={<Batches/>}/>
        <Route path='/addBatch' element={<CreateBatch/>}/>
        <Route path='/updateBatch' element={<UpdateBatch/>}/>

        



        <Route path='/programs' element={<Program/>}/>
       <Route path='/addProgram' element={<AddProgram/>}/>
       <Route path='/updateProject' element={<UpdateProject/>}/>

       <Route path='/upload' element={<Upload/>}/>

       
       

        
        

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
