import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { context } from './App';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    //const [isAutheticated,setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const value = useContext(context);
    const {setIsAuthenticated} = value;
    


    const sentLoginReq = ()=>{
         axios.post('http://localhost:5000/login',{email:email,password:password},{withCredentials:true}).then((response)=>{
            console.log(response.data);
            setIsAuthenticated(response.data.authenticated);
                                  
            
        });
    };
    const isValidConnection = ()=>{
        axios.get('http://localhost:5000/sessionId',{withCredentials:true}).then(response=>{
            setIsAuthenticated(response.data.authenticated);
            console.log(response.data.authenticated);
        });
    }

    useEffect(()=>{
        isValidConnection();
        if(value.isAuthenticated){
            navigate('/');
        }
        
    },[value.isAuthenticated]);

  return (
    <div>
        <label htmlFor="email">Email: </label>
        <input type="text" id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="password">Password: </label>
        <input type="password"  id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={sentLoginReq}>Login</button>
        <div>Don't have Account : <Link to="/sign-up">SignUp</Link></div>
    </div>
  )
}

export default Login