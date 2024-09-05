const express = require('express');
const app = express();
//const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const {createSessionId,isAuthorizedCookie, createSession} = require('./controller/auth');
const db = require('./model/db');

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

 

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

app.post('/sign-up',(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
    console.log(email);
    db.query('select * from admin where email=?',email,(err,result)=>{
        console.log(result);
        if(err){
            console.log(err);
        }else if (result.length==0){
            
                db.query(
                    'insert into admin (name,email,password) values (?,?,?)',
                    [name,email,password],(err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(result);
                            //res.cookie("adminId",`${name+password}`,{expires:new Date.now()+30*24*60*60*1000,httpOnly:true});
                            res.send('Account Created');
                        }
                })
            
        }else{
            
            console.log('email already exist');
            res.send('Already email used by someone');
        }
    });
});

app.post('/login',createSession,(req,res)=>{    
    const {sessionId,name,email,id,authenticated} = req.body;
    res.set('Set-cookie',`session=${sessionId}`);
    res.send({name,email,id,authenticated});
});

app.get('/profile',isAuthorizedCookie,(req,res)=>{
    console.log(req.body);
    if(req.body.authenticated){
        res.send({...req.body});
    }else{
        res.send({message:"please login again"});
    }   
   
});

app.get('/sessionId',isAuthorizedCookie,(req,res)=>{
    res.send({authenticated:req.body.authenticated});
    });

app.get('/logout',(req,res)=>{
    const cookieOptions = {
        expires:new Date(Date.now()),
        httpOnly:true,
        sameSite:'None',
        path:'/'
    };
    res.clearCookie('adminId',cookieOptions);
    res.send('logged out');
});

app.get('/employees',isAuthorizedCookie,(req,res)=>{
    if(req.body.authenticated){
        db.query('SELECT * FROM employees',(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        });
    }
    
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
});

app.use('*',(req,res)=>{
 res.status(400).send('sorry page not found');
});




app.listen(5000,()=>{
    console.log("server running on localhost port 5000");
});