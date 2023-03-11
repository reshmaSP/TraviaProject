const express = require ("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

mongoose.connect("mongodb+srv://UrshitaKoshti:urshitakoshti@cluster0.rvte6j3.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err)
    {
        console.log("connected to db")
    }else{
        console.log("error")
    }
})
//schema

const sch = {
    email:String,
    password:Number,
    accountname:String
}

const monmodel= mongoose.model("LOGIN",sch);
//POST

app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data = new monmodel({
        email:req.body.email,
        password:req.body.password,
        accountname:req.body.accountname

    });

    const val= await data.save();
    res.json(val);
})

//PUT

app.put("/update/:accountname",async(req,res)=>{

    let upaccountname =req.params.accountname;
    let upemail = req.body.email;
    let uppassword = req.body.password;

    monmodel.findOneAndUpdate({accountname:upaccountname},{$set:{email:upemail,password:uppassword}},{new:true},(err,data)=>{
    if(err){
        res.send("ERROR")

    } else{
        if (data==null)
        {
            res.send("nothing found")
        }else{
            res.send(data)
        }
    }
    })
    
})

//FETCH

app.get('/fetch/:accountname',function(req,res){
    fetchaccountname= req.params.accountname;
    monmodel.find(({accountname:fetchaccountname}),function(err,val){
        if(val.lenght==0)
        {
            res.send("data does not exists");
        }
        else{
            res.send(val);
        }

        
    }) 
})

//DELETE

app.delete('/del/:accountname',function(req,res){

    let delaccountname = req.params.accountname

    monmodel.findOneAndDelete(({accountname:delaccountname}),function(err,docs){

        res.send(docs);
    })
})

app.listen(3000,()=>{
    console.log("on port 3000")
})