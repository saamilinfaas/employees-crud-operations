import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function App() {
  const [isAddEmployee,setIsAddEmployee] = useState(false);
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);
  const [employeeList,setEmployeeList] = useState([]);
  const [clickedUpdate,setClickedUpdate] = useState(false);
  const [employee,setEmployee] = useState({});

  

  const displayInfo = ()=>{
    console.log(name + age + country + position + wage);
  };

  const addEmployee = ()=>{
    Axios.post('http://localhost:5000/create',{name:name,age:age,country:country,position:position,wage:wage}).then((response)=>{
      setEmployeeList([...employeeList,{
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }]);
    });
    setName("");
    setAge(0);
    setCountry("");
    setPosition("");
    setWage(0);
  };

  const getEmployee = ()=>{
    Axios.get('http://localhost:5000/employees').then((response)=>{
      setEmployeeList(response.data);
    });
  };

  const showEditEmployee = (employee)=>{
    setEmployee(employee);
    setClickedUpdate(true);
    console.log(employee);
  };

  const updateEmployee = (e)=>{
    e.preventDefault();
    const employeeId = employee.id;
    console.log(typeof employeeId);
    Axios.put('http://localhost:5000/update',{employee}).then(response=>{
      console.log(response);
      
    });
    const filteredArray = employeeList.filter(employee=>employee.id !== employeeId);
    setEmployeeList([...filteredArray,employee]);
    setClickedUpdate(false);
  };

  const deleteEmployee = (id)=>{
     const confirmed = window.confirm('Are you sure???');
     if(confirmed){
      console.log('confiremed');
      Axios.delete(`http://localhost:5000/delete/${id}`).then(response=>{
        console.log(response.data);
      });
     }
    
  }

  return (
    <div className="App">

      {isAddEmployee && <div className="information">
        <IoIosCloseCircle className='danger btn-close' onClick={()=>setIsAddEmployee(false)}/>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
        <label htmlFor="age">Age: </label>
        <input type="number" id="age" onChange={(e)=>{setAge(e.target.value)}} value={age}/>
        <label htmlFor="country">Country: </label>
        <input type="text" id="country" onChange={(e)=>{setCountry(e.target.value)}} value={country}/>
        <label htmlFor="position">Position: </label>
        <input type="text" id="position" onChange={(e)=>{setPosition(e.target.value)}} value={position}/>
        <label htmlFor="wage">Wage (Year): </label>
        <input type="number" id="wage" onChange={(e)=>{setWage(e.target.value)}} value={wage}/>
        <button onClick={addEmployee}>Add Employee</button>
      </div>}

      {!isAddEmployee && <button onClick={()=>setIsAddEmployee(true)}>Show add employee</button>}

      <hr className='hr'/>

      <div className='employees'>
        <button onClick={getEmployee}>Show Employees</button>

        {clickedUpdate && employee && <div className='updateEmployee'>
          <h3>Update Employee</h3>
          <form action="">
                <label htmlFor="">ID : <b>{employee.id} </b></label>
                <input type="text" value={employee.name} onChange={e=>{setEmployee({...employee,name:e.target.value})}}/>
                <input type="number" value={employee.age} onChange={e=>{setEmployee({...employee,age:e.target.value})}}/>
                <input type="text" value={employee.country} onChange={e=>{setEmployee({...employee,country:e.target.value})}}/>
                <input type="text" value={employee.position} onChange={e=>{setEmployee({...employee,position:e.target.value})}}/>
                <input type="text" value={employee.wage} onChange={e=>{setEmployee({...employee,wage:e.target.value})}}/>
                <button onClick={(e)=>{updateEmployee(e)}}> Update </button>
                <button onClick={()=>setClickedUpdate(false)}>Cancel</button>
          </form>
              </div>}


        {employeeList.map((employee,index)=>{
          return (<div key={index} className='employee'>
            <h3>Name: {employee.name}</h3>
            <h3>Age: {employee.age}</h3>
            <h3>Country: {employee.country}</h3>
            <h3>Position: {employee.position}</h3>
            <h3>Wage: {employee.wage}</h3>
            <FaEdit className='icon ' onClick={()=>{showEditEmployee(employee)}}/>
              
            <MdDelete className='icon danger' onClick={()=>deleteEmployee(employee.id)}/>
            <hr />
          </div>)
        })}

      </div>
    </div>
  );
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
