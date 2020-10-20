const mysql = require("mysql");

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'node'
});

exports.register = (req, res) =>{
    console.log(req.body);
    const {name, repname, pass, reppas} = req.body;

    db.query('SELECT name FROM login WHERE name = ?', [name], (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){

        }
    })

    res.send("Form submitted");
}