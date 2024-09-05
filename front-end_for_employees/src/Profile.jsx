import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import {context} from './App';

const Profile = () => {
    const value = useContext(context);
    const {setUser,user} = value;

    const getUser = ()=>{
        axios.get('http://localhost:5000/profile',{withCredentials:true}).then(response=>{
            console.log(response.data);
            setUser(response.data);
        });
    }; 


    useEffect(()=>{
        getUser();        
    },[])

  return (
    <div>
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        <h3>{user.id}</h3>
    </div>
  )
}

export default Profile