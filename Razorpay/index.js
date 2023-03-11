const express = require("express");
const app=express();
const port=3001;
const Razorpay=require("razorpay");
const cors=require("cors");
app.use(express.json());
app.use(cors());
app.get("/",(req,res) => {
    res.send("Hello World");
});

app.post("/payment",async(req,res)=>{
    let{amount}=req.body;
    var instance = new Razorpay({ key_id: 'rzp_test_FvEK3riVk67qC9', key_secret: 'HH7IiLucxpLnN8bZNAfcIVGv' })

let order = await instance.orders.create({
  amount: amount*100,
  currency: "INR",
  receipt: "receipt#1",
//   notes: {
//     key1: "value3",
//     key2: "value2"
//   }
});
res.status(201).json({
    success : true,
    order,
    amount,
});



});
app.listen(port,() =>{
console.log('Server is running on port ${port}');
});