const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Blogs = new Schema({
  firstname:String,
  lastname:String,
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:String,
});


const contacts = mongoose.model('contact',Blogs);
module.exports = contacts;