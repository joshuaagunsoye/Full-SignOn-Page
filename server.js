const express = require("express");
const app = express();
const Database = require("better-sqlite3");
const db = new Database ('Customer Details.db');
const cors = require('cors');
app.options('*',cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const multer = require('multer');
const upload = multer();

///////////////////////////////////////////////////////////post and get for customer details
app.get('/details',(req,res)=>{
    res.setHeader ('Access-Control-Allow-Origin','*');
    const sql = "SELECT * FROM details"
    const statement = db.prepare(sql);
    const arrOutput = [];
    for (const details of statement.iterate())
    {
        console.log(details);
        arrOutput.push(details);

    }
    res.end(JSON.stringify(arrOutput));
})


app.post("/details",upload.none(),(req,res)=>{
                    
    res.setHeader ('Access-Control-Allow-Origin','*');
    const sql = `INSERT INTO details(FName,LName,Email,Pass,Gender) VALUES (?,?,?,?,?)`;
    const statement = db.prepare(sql);
    const result = statement.run([req.body.FName,req.body.LName,
        req.body.Email,req.body.Pass
        ,req.body.Gender])
        res.end();     
});

////////////////////////////////////////////////////////////post and get for customer user name
app.get('/users',(req,res)=>
{
    
    res.setHeader('Access-Control-Allow-Origin','*')
    
    const sql = "SELECT * FROM CustomerUserName";
    const statement = db.prepare(sql);

    const arrOutput = [];
    for (const customers of statement.iterate())
    {
        console.log(customers);
        arrOutput.push(customers);

    }
    res.end(JSON.stringify(arrOutput));
   
})
app.post("/users",upload.none(),(req,res)=>{
    console.log(req)

                    
    res.setHeader ('Access-Control-Allow-Origin','*');
    const sql = `INSERT INTO CustomerUserName (UName) VALUES (?)`;
    const statement = db.prepare(sql);
    const resultOne = statement.run([req.body.UName])
        res.end();     
});

////////////////////////////////////////////////////////////////////post and get for customer address

app.get('/address',(req,res)=>
{
    
    res.setHeader('Access-Control-Allow-Origin','*')
    
    const sql = "SELECT * FROM Address";
    const statement = db.prepare(sql);

    const arrOutput = [];
    for (const customers of statement.iterate())
    {
        console.log(customers);
        arrOutput.push(customers);

    }
    res.end(JSON.stringify(arrOutput));
   
})

app.post("/address",upload.none(),(req,res)=>{
    
    console.log(req)                    
    res.setHeader ('Access-Control-Allow-Origin','*');
    const sql = `INSERT INTO Address (Street, City, Country) VALUES (?,?,?)`;
    const statement = db.prepare(sql);
    const resultTwo = statement.run([req.body.Street,req.body.City,req.body.Country])
        res.end();     
});




/////////////////////////////////////////////////////////

app.delete("/users/:id",(req,res)=>
{
    
    res.setHeader ('Access-Control-Allow-Origin',req.headers.origin)
    const sql = "DELETE FROM CustomerUserName WHERE Id=?";
    const statement = db.prepare(sql);
    statement.run([req.params.id]);
    console.log('delete',req.params.id);
    res.end();
});

///////////////////////////////////////////////////////////// put for users


app.put("/users",upload.none(),(req,res)=>{
                    
    res.setHeader ('Access-Control-Allow-Origin','*');
    const sql = `UPDATE CustomerUserName SET UName=? WHERE Id=`+ req.body.Id;
    const statement = db.prepare(sql);
    const resultThree = statement.run([req.body.UName])
        res.end();     
});


app.listen(8888);























































