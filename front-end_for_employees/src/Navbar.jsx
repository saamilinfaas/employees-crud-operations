import React, { useContext, useEffect, useState } from 'react';
import './navBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { context } from './App';
import axios from 'axios';

const Navbar = () => {
    const {isAuthenticated} = useContext(context);
    const value = useContext(context);
    

    const navigate = useNavigate();
    
    const logout = ()=>{
        axios.get('http://localhost:5000/logout',{withCredentials:true}).then(response=>{
            console.log(response);
            if(response){
                navigate('/login');
                value.setIsAuthenticated(false);
            }
        });
    };
    

    
  return (
    <>
        <nav >
            <div className='logo'></div>
            <div className='nav'>
                {isAuthenticated && <Link to="/" className='link'>Home</Link>}
                {isAuthenticated && <Link to='/profile' className='link'>Profile</Link>}
                {!isAuthenticated && <Link to="/login" className='link'>Login</Link>}
                {!isAuthenticated && <Link to="/sign-up" className='link'>Signup</Link>}
                {isAuthenticated && <button onClick={logout} className='link'>Logout</button>}
            </div>
            <div></div>
        </nav>
    </>
  )
}

export default Navbar