const uuid = require('uuid').v4;
const db = require('../model/db');

const sessions = {};


 const createSessionId = ()=>{
    const sessionId = uuid();
    return sessionId;
};

 const isAuthorizedCookie = (req,res,next)=>{
    const body = req.body
   const sessionId =  req.headers.cookie?.split('=')[1];
   //console.log('sessionID from isAuthorizedCookie',sessionId);
   //console.log(sessions,'True or false for session id: ',(sessionId in sessions));
   if(sessionId in sessions ){
    const user = sessions[sessionId];
    req.body = {...user,authenticated:true};    
    //console.log('from isAuthorizedCookies function the body is ',req.body);    
    next();
   }else{
    req.body = {authenticated:false};
    next();
   }
};

const createSession = (req,res,next)=>{
    const password = req.body.password;
    const email = req.body.email;
    db.query('select * from admin where email=?',[email],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            if(result.length === 0){
                res.body({authenticated:false, message: 'invalid credencials'});
                next();
            }else{
               const dbpassword = result[0]?.password;               
               if(dbpassword == password){
                const sessionId =  createSessionId();                
                sessions[sessionId] = {name:result[0].name,email:email,id:result[0].id,role:result[0].role};                
                req.body = {email:email,name:result[0].name,id:result[0].id,sessionId:sessionId,authenticated:true};                
                next();
               };
            };
        };
    });      
};

module.exports = {createSessionId,isAuthorizedCookie,createSession}