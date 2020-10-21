//variabler
const exrpess = require('express');
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const port = process.env.port || 8080;
const app = exrpess();
//Connection string
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'node'
});
//det her er min engine som sørger for at komme ind på siden
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

//her så opretter en bruger
app.post('/submit', function(req, res) {
    con.connect(function(err){
        if (err) throw err;//hvs der er fejl så output og den køre ikke videre
        //Der er ikke fejl med connection
        console.log('Connected');
        console.log('Username: ' + req.body.name);
        console.log('Password: ' + req.body.pass);

        //her fortæller jeg den hvad den skal gøre 
        var sql = `INSERT INTO login VALUES (null, '${req.body.name}','${req.body.repname}','${req.body.pass}','${req.body.reppas}')`;
        console.log(sql);
        con.query(sql, function (err, result){
            if(err) throw err;//Hvis der er fejl ved min sql variabel fortæller den der er fejl
            console.log('1 record inserted');//den fortæller der er blevet oprettet en bruger 
        });
    });
});

app.post('/login', function(req, res) {
    
    con.connect(function(err){
        if (err) throw err;//checker om der er connection
        console.log('Connected');//hvis der er connection fortsætter den
        console.log('Username: ' + req.body.name);
        console.log('Password: ' + req.body.password);
        //her fortæller jeg den at den skal checke om navnet findes
        var sql = `SELECT * FROM login WHERE name = '${req.body.name}' and pass = '${req.body.password}'`;
        //console.log(sql);

        con.query(sql, function (err, result){
            if(err) throw err;//hvis navnet ikke findes skal den stoppe og fortælle
            console.log('Velkommen');
        });
        res.render('login');
    });
});
/*
app.get('/', function(req, res) {
    res.render('login');
});
*/
app.listen(port, () => console.log(`Server is running at port: ${port}`));