const express = require('express');
const cors = require('cors');
const {MongoClient} =require('mongodb');
const fileupload = require('express-fileupload');


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());

const PORT =process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//configuration (MONGODB)
var curl ="mongodb://localhost:27017";
var client = new MongoClient(curl);

app.get('/klef/test',async function(req,res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse',async function(req,res){
    res.json(req.body);
    //res.json("Computer Science Engineering");
});

//REGISTRATION MODULE
app.post('/registration/signup',async function(req,res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully....")

    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin',async function(req,res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch{
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//MY PROFILE
app.post('/myprofile/info', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//FILE UPLOAD
app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('../src/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('users');
        data = await users.updateOne({emailid: fname},{$set : {imgurl: fname +'.jpg'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//add vehicle details
app.post('/home/addvehicle',async function(req,res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('det');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Savedsuccessfully....")

    }catch(err)
    {
        res.json(err).status(404);
    }
});


//show vehicle details
app.post('/home/vehicledetails', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('pro');
        users = db.collection('det');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});