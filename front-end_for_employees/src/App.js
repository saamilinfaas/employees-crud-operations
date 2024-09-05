import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import React, { createContext, useState } from 'react';
import Profile from './Profile';


 export const context = React.createContext();


function App() {  
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [user,setUser] = useState({});
  
  return (
    <div className="App">
      <context.Provider value={{setIsAuthenticated,isAuthenticated,setUser,user}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>          
          <Route path="/profile" element={<Profile/>}/>          
          <Route path="*" element={<Login/>}/>          
        </Routes>
      </BrowserRouter>
      </context.Provider>

    </div> );
}

export default App;

/* 
{clickedUpdate && <div className='updateEmployee'>
                <input type="text" value={employee.name} onChange={e=>{setName(e.target.value)}}/>
                <input type="number" value={employee.age} onChange={e=>{setAge(e.target.value)}}/>
                <input type="text" value={employee.country} onChange={e=>{setCountry(e.target.value)}}/>
                <input type="text" value={employee.position} onChange={e=>{setPosition(e.target.value)}}/>
                <input type="text" value={employee.wage} onChange={e=>{setWage(e.target.value)}}/>
                <button > Update</button>
                <button onClick={()=>setClickedUpdate(false)}>Cancel</button>
              </div>}
*/
