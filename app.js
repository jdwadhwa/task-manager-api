const express = require("express");
require("./src/db/mongoose");
const user = require("./src/models/user");
const task = require("./src/models/task");
const userroute = require("./routes/user");
const taskroute = require("./routes/task");
const app = express();
const multer = require("multer");
app.use(express.json());
const port  = process.env.PORT;

// app.use((req,res,next)=>{
//     if(req.method==="GET"||req.method==="POST"||req.method==="PATCH"||req.method==="DELETE")
//     {
//         res.status(404).send("site is under maintainece");
//     }
//     else{
//         next();
//     }
// })
const upload = multer({
    dest:"images",
    limits:1000000,
    fileFilter(req,file,cb)
    {
        if(file.originalname.endsWith(".png")||file.originalname.endsWith(".jpg"))
        {
            cb(undefined,true)
        }
        else{
            cb(new Error("please provide an image"));
        }
     
    }
})
app.post("/upload",upload.single('up'),(req,res)=>{
    res.send();
},(err,req,res,next)=>{
    res.status(400).send({error:err.message});
});
app.use(userroute);
app.use(taskroute);
// app.post("/users",async (req,res)=>{
//     const x = new user(req.body);

//    try{

//     var z = await x.save();
//     res.send(z);
//    }
//    catch(e)
//    {
//     res.send(e);
//    }
    


//     // x.save().then(data=>{
//     //     res.send(data);
//     // }).catch(err=>{
//     //     res.status(400).send(err);
//     // })
// })

// app.post("/tasks",(req,res)=>{
//     var z = new task(req.body);
//     z.save().then(data=>{
//         res.send(data);
//     }).catch(err=>{
//         res.status(400).send(err);
//     })
// })


// app.get("/users",async (req,res)=>{
//     // user.find({}).then(data=>{
//     //     res.send(data);
//     // }).catch(err=>{
//     //     res.status(400).send(err);
//     // })
//     try{
//     var z =await user.find({});
//     res.send(z);
//     }
//     catch(e)
//     {
//         res.send(e);
//     }


// })

// app.get("/users/:id",async (req,res)=>{
//     _id=req.params.id;
//     // user.findById(_id).then(data=>{
//     //     res.send(data);
//     // }).catch(err=>{
//     //     res.status(500).send(err);
//     // })
//     try{
//         var z = await user.findById(_id);
//         res.status(200).send(z);
//     }
//     catch(e)
//     {
//         res.status(401).send(e);
//     }
    

// })

// app.get("/tasks",async (req,res)=>{
// //     task.find({}).then(data=>{
// //         res.send(data);
// //     }).catch(err=>{
// //         res.send(err);
// //     })
// // })
// try{
//     var z = await task.find({});
//     res.status(201).send(z);
// }
// catch(e)
// {
//     res.status(401).send(e);
// }

// })
// app.get("/tasks/:id",async(req,res)=>{
//     var z= req.params.id;
//     // task.findById(z).then(data=>{
//     //     if(data)
//     //     {
//     //         res.send(data);
//     //     }
//     // }).catch(err=>{
//     //     res.send(err);
//     // })
//     try{
//         var m =  await(task.findById(z));
//         res.send(m);
//     }
//     catch(e){
//         res.send(e);
//     }
// })

// app.patch("/users/:id",async (req,res)=>{
//     var allowedupdates=["name","email","age","password"];
//     var updatesrecieved = Object.keys(req.body);
    
//     for(var i=0; i<updatesrecieved.length; i++)
//     {   
//         var x =false;
//         var x = updatesrecieved[i];
//         for(var j=0; j<allowedupdates.length; j++)
//         {
//             if(x==allowedupdates[j])
//             {
//                 x=true;
//                 break;
//             }

//         }
//         if(x==false)
//         {
//             break;
//         }
//     }

//     if(x==true)
//     {
//             var z= req.params.id;
//             try{
//                 var m =await user.findByIdAndUpdate(z,req.body,{new:true,runValidators:true});
//                 if(m)
//                 {
//                     res.status(200).send(m);
//                 }
//                 else{
//                     res.status(401).send("no user found");
//                 }
        
//             }
//             catch(e)
//             {
//                 res.status(401).send(e);
//             }
            
//     }


// })

// app.patch("/tasks/:id",async (req,res)=>{
//     var updates = Object.keys(req.body);
//     var allowedupdates = ["description","completed"];
//     for(var i=0; i<updates.length; i++)
//     {
//             var x=  false;
//         for(var j=0; j<allowedupdates.length; j++)
//         {
//                 if(updates[i]==allowedupdates[j])
//                 {
//                     x= true;
//                     break;
//                 }
//                 if(x==false)
//                 {
//                     break;
//                 }
//         }
//         if(x)
//         {
//             var z=  req.params.id;
//             try{ var l = await task.findByIdAndUpdate(z,req.body,{new:true,runValidators:true});
//             if(!l)
//             {
//                 res.status(401).send();
//             }
//             else{
//                 res.status(200).send(l);
//             }
// }
// catch(e){
//     res.status.send(e);
// }
           
//         }
//     }
// })

// app.delete("/users/:id",async (req,res)=>{

//     var z = req.params.id;
    
//         var l= await user.findByIdAndDelete(z);
//     try{    if(!l)
//         {
//             res.status(409).send("no such user")
//         }else{
//             res.status(200).send(l)
//         }
//     }
//     catch(e){
//         res.status(404).send(e);
//     }

  

// })

// app.delete("/tasks/:id",async (req,res)=>{

//     var z=  req.params.id;
//     try{
//         var x =await task.findByIdAndDelete(z);
//         if(!x)
//         {
//             res.status(404).send("not a valud task");
//         }
//         else{
            
//             res.status(200).send(x);
            
//         }
//     }catch(e)
//     {
//         res.status(404).send(e);
//     }
    
    
// })

app.listen(port,()=>{
    console.log("server has started",port);
})