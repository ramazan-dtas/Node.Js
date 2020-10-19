var express = require('express');
var http = require('http');//include http library
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
    
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'node'
});

function myFunction(){
    connection.connect(function(err){
        if (err) throw err;
        console.log('Connected');
        document.getElementById("name").value;
        document.getElementById("repname").value;
        document.getElementById("pass").value;
        document.getElementById("reppas").value;

        var sql = `INSERT INTO login VALUES (null, '"${req.body.name}"','"${req.body.repname}"','"${req.body.pass}"','"${req.body.reppass}"')`;
        //var sql = "INSERT INTO login VALUES (null, '"+req.body.name+"','"+req.body.repname+"','"+req.body.pass+"','"+req.body.reppass+"')";
        console.log(sql);
        connection.query(sql, function (err, result){
            if(err) throw err;
            console.log('1 record inserted');
        });
        
    });
}

http.createServer(function (req, res) {
    //Open a file on the server and return its content:
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(8080);
  
