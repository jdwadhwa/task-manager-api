const express = require("express");
const task = require("../src/models/task");
const auth = require("../src/middleware/auth");
const taskroute = new express.Router();


taskroute.post("/tasks",auth,(req,res)=>{

    var z = new task({
        description:req.body.description,
        completed:req.body.completed,
        owner:req.user._id,
    })
    z.save().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(400).send(err);
    })
})


taskroute.get("/tasks",auth,async (req,res)=>{
    //     task.find({}).then(data=>{
    //         res.send(data);
    //     }).catch(err=>{
    //         res.send(err);
    //     })
    // })
    try{
     //   var z = await task.findOne({owner:req.user._id});
    var z =  req.user.populate("owner").execpopulate();
        res.status(201).send(z.mytask);
    }
    catch(e)
    {
        res.status(401).send(e);
    }
    
    })

    taskroute.get("/tasks/:id",auth,async(req,res)=>{
        var z= req.params.id;
        // task.findById(z).then(data=>{
        //     if(data)
        //     {
        //         res.send(data);
        //     }
        // }).catch(err=>{
        //     res.send(err);
        // })
        try{
            var m =  await task.findOne({_id:z,owner:req.user._id});
            res.send(m);
        }
        catch(e){
            res.send(e);
        }
    })


    taskroute.patch("/tasks/:id",auth,async (req,res)=>{
        var updates = Object.keys(req.body);
        var allowedupdates = ["description","completed"];
        for(var i=0; i<updates.length; i++)
        {
                var x=  false;
            for(var j=0; j<allowedupdates.length; j++)
            {
                    if(updates[i]==allowedupdates[j])
                    {
                        x= true;
                        break;
                    }
                    if(x==false)
                    {
                        break;
                    }
            }
            if(x)
            {
                var z=  req.params.id;
                try{ 
                    var l = await task.findOne({_id:z,owner:req.user._id});
                if(!l)
                {
                    res.status(401).send();
                }
                else{
                    updates.forEach(ele=>{
                        l[ele]=req.body[ele];
                        
                    })
                 l=   await task.save();
                    res.status(200).send(l);
                }
    }
    catch(e){
        res.status.send(e);
    }
               
            }
        }
    })


    taskroute.delete("/tasks/:id",async (req,res)=>{

        var z=  req.params.id;
        try{
            var x =await task.findByIdAndDelete(z);
            if(!x)
            {
                res.status(404).send("not a valud task");
            }
            else{
                
                res.status(200).send(x);
                
            }
        }catch(e)
        {
            res.status(404).send(e);
        }
        
        
    })

    module.exports = taskroute;
    