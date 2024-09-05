import axios, { Axios } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { context } from './App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [response,setResponse] = useState("");
    const value = useContext(context);
    const navigate = useNavigate();
    

    const signup = ()=>{
        axios.post('http://localhost:5000/sign-up',
            {name:name,email:email,password:password,confirmPassword:confirmPassword}
        ).then(response=>{
            console.log(response.data);
            setResponse(response.data);
        })
    };

    useEffect(()=>{
        
    },[]);

  return (
    <div>
        <div className='input'>
            <label htmlFor="name">Name: </label>
            <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='input'>
            <label htmlFor="email">Email: </label>
            <input type="text" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='input'>
            <label htmlFor="password">Password: </label>
            <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='input'>
            <label htmlFor="confirmpassword">Confirm Password: </label>
            <input type="password" id='confirmpassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            {password!==confirmPassword && <div className='danger'>password not matched</div>}
        </div>
        <h6>{response}</h6>
        <button disabled={loading} onClick={signup}>SignUp</button>
        <div>Already have an Account : <Link to='/login'>Login</Link></div>
    </div>
  )
}

export default Signup