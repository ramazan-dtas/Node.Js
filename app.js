const exrpess = require('express');
//const session = require('express-session');
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const port = process.env.port || 8080;
const app = exrpess();

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'node'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/submit', function(req, res) {
    con.connect(function(err){
        if (err) throw err;
        console.log('Connected');
        console.log('Username: ' + req.body.name);
        console.log('Password: ' + req.body.pass);


        var sql = `INSERT INTO login VALUES (null, '${req.body.name}','${req.body.repname}','${req.body.pass}','${req.body.reppas}')`;
        console.log(sql);
        con.query(sql, function (err, result){
            if(err) throw err;
            console.log('1 record inserted');
        });
    });
});

app.post('/login', function(req, res) {
    
    con.connect(function(err){
        /*var username = req.body.name;
	    var password = req.body.password;*/
        if (err) throw err;
        console.log('Connected');
        console.log('Username: ' + req.body.name);
        console.log('Password: ' + req.body.password);

        var sql = `SELECT * FROM login WHERE name = '${req.body.name}' and pass = '${req.body.password}'`;
        //console.log(sql);

        con.query(sql, function (err, result){
            if(err) throw err;
            console.log('Velkommen');
        });
    });
});

app.get('/')

app.listen(port, () => console.log(`Server is running at port: ${port}`));