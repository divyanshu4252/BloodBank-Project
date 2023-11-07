const express = require('express');
const async = require('hbs/lib/async');
const router=express.Router()
const mongoose= require ('mongoose')
async function conn()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/pp')
    console.log('mongo connected')
}
conn()
const details = new mongoose.Schema({
    name: {type:String,required:true},
    age: {type:Number,required:true},
    gender: {type:String,required:true},
    bloodgroup: {type:String,required:true},
    mobileno: {type:Number,required:true}
})
const MyModel = mongoose.model('details',details)

//for site page:-
router.get('/',(req,res)=>{
    res.render('homepage')
})

//from site to user login:-
router.get('/login',(req,res)=>{
    res.render("login")
})

//from user login to user home page:-
router.post('/adminlogin',(req,res)=>{
    let uid=req.body.uid;
    let pwd=req.body.pwd;
    if(uid==="blood"&&pwd==="12345")
    {
        res.render('showhome')
    }
    else
    {
        res.render('login')
    }
})

//for user home page:-
router.get('/showhome',async (req,res)=>{
      let data=await MyModel.find();  
      res.render('showhome',{'data':data})    
})

//for add:-
router.get('/adddetails',(req,res)=>{
    res.render('adddetails')
})
router.post('/adddetails',(req,res)=>{
    let data={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        bloodgroup:req.body.bloodgroup,
        mobileno:req.body.mobileno
    }
    let d=new MyModel(data);
    d.save()
    res.render('adddetails') 
})
router.get('/adddetails',(req,res)=>{
    res.render('showhome')
})

//From user page back to public page:-
router.get('/homepage',(req,res)=>{
    res.render('homepage')
})

//for update:-
router.get('/updatedetails',(req,res)=>{
    res.render('updatedetails')
})
router.post('/updatedetails',async (req,res)=>{
    let name=req.body.name
    let age=req.body.age
    let gender=req.body.gender
    let bloodgroup=req.body.bloodgroup
    let mobileno=req.body.mobileno
    const r=await MyModel.findOneAndUpdate({name:name},{$set:{
        age:age,
        gender:gender,
        bloodgroup:bloodgroup,
        mobileno:mobileno
      }})
      console.log(r)
      if(r==null)
      {
        console.log('not updated')
      }
      else{
        console.log('updated')
      }
    res.render('updatedetails')
})
router.get('/updatedetails',(req,res)=>{
    res.render('showhome')
})

//For delete:-
router.post('/showhome/:name',async(req,res)=>{
    let name=req.params.name
    let d=await MyModel.findOneAndDelete({name:name})
    console.log(d+' product successfully deleted')
    
    res.redirect('/showhome')
})

module.exports=router
