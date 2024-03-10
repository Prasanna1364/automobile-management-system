import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home';
import ChangePassword from './changepassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AxiosDemo from './axiosdemo';
import MyProfile from './myprofile';
import AddVehicle from './addvehicle';
import VehicleDetails from './vehicledetails';

function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        <Route path='/axiosdemo' element={<AxiosDemo/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/addvehicle' element={<AddVehicle/>} />
        <Route path='/vehicledetails' element={<VehicleDetails/>} />
      </Routes>
    </BrowserRouter>

    // <div className='full-height'>
    //   <Home/>
    //   <Login/>
    // </div>
  );
}
ReactDOM.render(<Website/>,document.getElementById('root'))
