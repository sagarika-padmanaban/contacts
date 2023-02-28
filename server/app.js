const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const contacts = require('./schema');


const app = express();
app.use(bodyparser.json());


const uri ="mongodb+srv://saga:saga@cluster0.tm9jrqm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log('Connected!'));




app.post('/POST/v1/contacts', async (req,res)=>{
    try {
        const {firstname,lastname,email,phone} = req.body;
        const data = await contacts.create({
            firstname,
            lastname,
            email,
            phone
        })
        console.log(data);
        return (
            res.status(201).json({
                status:"Success",
                message:"Sucessfully Registered"
            })
        )
    } catch (error) {
            res.status(400).json({
                status:"failed",
                message:error.message
            })
    }
})


app.get('/GET/v1/contacts', async (req,res)=>{
        const data = await contacts.find();
        console.log(data);
        return (
            res.status(201).json({
                status:"Success",
                data
            })
        )
})

app.delete('/DELETE/v1/contacts/:id', async (req,res)=>{
    const data = await contacts.deleteOne({_id:req.params.id});
    console.log(data);
    return (
        res.status(201).json({
            status:"Success",
            message:"Successfully deleted"
        })
    )
})

app.put('/PUT/v1/contacts/:id', async (req,res)=>{
    const {firstname,lastname,email,phone} = req.body;
    try {
        const data = await contacts.findOne({_id:req.params.id});
        if(req.body)
        {
            data.firstname= firstname,
            data.lastname= lastname,
            data.email= email,
            data.phone= phone
        }
        await data.save();
        console.log(data);
        return (
            res.status(201).json({
                status:"Success",
                message:"Successfully updated",
                data
            })
        )
        
    } catch (error) {
        return (
            res.status(400).json({
                status:"Failed",
                message:error.message,
            })
        )
        
    }
 
})


app.patch('/PATCH/v1/contacts/:id', async (req,res)=>{
    const {firstname,lastname,email,phone} = req.body;
    const data = await contacts.findOne({_id:req.params.id});
    if(firstname){
        data.firstname= firstname
    }
    if(lastname){
        data.lastname= lastname
    }
    if(phone){
        data.phone= phone
    }
    if(email){
        data.email= email
    }
    await data.save();
    return (
        res.status(201).json({
            status:"Success",
            message:"Successfully updated",
            data
        })
    )
})

app.get('/GET/v1/contacts/:id', async (req,res)=>{
    try {
        console.log(req.params.id);
        const data = await contacts.findOne({_id:req.params.id});
        console.log(data);
        return (
            res.status(201).json({
                status:"Success",
                data
            })
        )
        
    } catch (error) {
        return (
            res.status(400).json({
                status:"Failed",
                message:error.message
            })
        )
    }

})




app.listen(5000,()=>{
    console.log("app is up");
})