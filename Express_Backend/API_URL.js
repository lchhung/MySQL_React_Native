const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Connect to database 
const db = mysql.createConnection({
    host: "localhost",
	user: "root",
	password: "14082205",
    database : 'hungkaizen'
});

db.connect();

//Insert data to MySQL database
app.post('/users', function(req, res){
	console.log(req.param('username')); 
    let userData = {username:req.body.username, userage:req.body.userage};
    let sqlInsert = 'INSERT INTO hungkaizen.hungkaizen_users SET ?';
    db.query(sqlInsert, userData, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data added!',
        //no: null,
		username: req.body.username,
		userage: req.body.userage
	});
});
});

// Get the data
app.get('/users', function(req,res){
let sqlGet = 'SELECT * FROM hungkaizen.hungkaizen_users';
db.query(sqlGet, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
});
});


// Delete data
// write following Express 4 format does not work for app.delete

app.delete('/users', function(req, res){
	console.log(req.param('username')); 
	let usernameDelete = req.param('username');
	let userageDelete = req.param('userage');
	let sqlDelete = 'DELETE FROM hungkaizen.hungkaizen_users tb WHERE tb.username= ? AND tb.userage =?';
	db.query(sqlDelete,[usernameDelete, userageDelete], (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send({'status':'deleted record has username ' + usernameDelete +' and age'+userageDelete});
	});
	

});

app.listen(3000, ()=>{
    console.log('The server run at port 3000')
});