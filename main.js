const express =require("express");
PORT = process.env.PORT || 9000;
const app=express();
var http = require('http');
var server = http.Server(app);
const bodyParser=require("body-parser");
app.use('/static',express.static('public'));
app.set('view engine','twig');
app.set('views','./Public/views');
const { check, validationResult } = require('express-validator');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended:false });
app.get("/",(req,res)=>
{
  res.render('login_form',{title:"Login page",message:"This page give you news regarding sports"});
})
app.get("/admin",(req,res)=>
{
  res.render(__dirname+'/admin.twig');
})
app.post("/",urlencodedParser,[
  check('name','Name Is Incoorect ').isLength({min:5}),
  check('password','Password must be Five Character').isLength({min:5})
],(req,res)=>
{
  const errors=validationResult(req);
  console.log(errors.mapped());
  console.log(req.body);
  if(req.body.name == 'Admin' && req.body.password == '12345')
  {
    res.render('logins',{name:req.body.name,password:req.body.password});
  }
  if(!errors.isEmpty())
  { 
    res.render('/admin',{name:req.body.email,password:req.body.password,error:errors.mapped()});
    
  }
})
server.listen(PORT,function(){
  console.log('Chat server running');
})
