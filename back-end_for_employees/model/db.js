const mysql = require('mysql2');

 const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'', //your password for connect with your db
    database:'employeesystem'
});

module.exports =  db;