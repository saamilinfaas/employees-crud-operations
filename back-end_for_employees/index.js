const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'', //your password for connect with your db
    database:'employeesystem'
});


app.post('/create',(req,res)=>{
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    const name = req.body.name;

    
    db.query('INSERT INTO employees (name,age,country,position,wage) VALUES (?,?,?,?,?)',[name,age,country,position,wage],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Values Inserted');
        }
    });
});

app.get('/employees',(req,res)=>{
    db.query('SELECT * FROM employees',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update',(req,res)=>{
    console.log(req.body);    
    const {id,name,age,country,position,wage} = req.body.employee;
    console.log(id);
    db.query('update employees set name=?, age=?, country=?, position=?, wage=? where id=?',[name,age,country,position,wage,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query('delete from employees where id=?',[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.listen(5000,()=>{
    console.log("server running on localhost port 5000");
});