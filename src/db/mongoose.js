const mongoose = require("mongoose");



mongoose.connect(process.env.url,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology: true});

 

//  var jd = new user({
//      name:"sanchay",
//      age:89,
//      password:"jhk"
//  })

//  jd.save().then(data=>{
//      console.log(data);
//  }).catch(err=>{
//      console.log(err);
//  })

// var myself =  new user({
//     name:"jatin",
//     age:27
// });

// myself.save().then((dta)=>{
//     console.log(dta);
// }).catch(err=>{
//     console.log(err);
// // })

// const task = mongoose.model("tasks",{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// });

// var tak= new task({
//     description:"                  clean                   your                    house             int jbsj          ",
    
// });


// tak.save().then((data)=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err);
// })

// var emai = mongoose.model("email",{
//     email:{
//         type:String,
//         required:true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("you typed the wrong email");
//             }
//         }
//     }
// })

// var u = new emai({
//     email:"jatinwadhwa921"
// })

// u.save().then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })