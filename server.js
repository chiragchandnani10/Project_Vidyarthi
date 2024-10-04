const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
var cons = require('consolidate');
const User = require('./models/users');
var bcrypt = require('bcrypt');
//var jwt = require('json-web-token');

//const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const app = express();

mongoose.connect('mongodb://localhost:27017/login-app-db')

app.engine('html', cons.swig);
app.set('views',path.join(__dirname,'views'));
app.set("view engine","html");


app.use(bodyParser.json({extended: true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",function(req,res)
{
    res.render("Food");
})

app.get("/final/profile",function(req,res)
{
    res.render("my_profile")
})

app.get("/final/fac",function(req,res)
{
    res.render("my_faculties")
})

app.get("/final/table",function(req,res)
{
    res.render("FFCS")
})

app.get("/contact",function(req,res)
{
    res.render("contact_us");
})

app.get("/signup",function(req,res)
{
    res.render("signup_page");
})

app.get("/final",function(req,res)
{
    res.render("after_login_page")
})

app.get("/final/timer",function(req,res){
    res.render("timer")
})

app.get("/final/list",function(req,res){
    res.render("todo")
})

app.get("/final/Whatsapp",function(req,res){
    res.render("class_updates")
})

app.get("/log",function(req,res)
{
    res.render("index")
})


app.post('/api/register',async(req,res)=>{
    const {username, password:plainTextPassword, reg_no} = req.body


    const password = await bcrypt.hashSync(plainTextPassword,10);

    try{
        await User.create({
            username,
            password,
            reg_no,
        })
        console.log('User created accound')
       return res.render("after_login_page")
    
    }catch(error){
        console.log(JSON.stringify(error))
        return res.json({status:'error'})
    }
})    
/*app.post("/api/login",async(req,res) =>{
    const {username,password} = req.body

    const user = await User.findOne({username}).lean()
    
    if(!user){

        const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        }, 
        JWT_SECRET

    )    

        return res.redirect("after_login_page")
    }

    if(await bcrypt.compare(password,user.password)){
        res.render("after_login_page")
    }
})*/

app.get("/team",function(req,res)
{
    res.render("about_us")
})

app.listen(5000,function(){
    console.log("The Server is working");
  });


  //---------------------------------------//


