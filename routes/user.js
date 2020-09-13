const express = require("express");
const user = require("../src/models/user");
const auth = require("../src/middleware/auth");
const userroute =  new express.Router();
const multer = require("multer");
const email = require("../src/emails/account");
const sharp = require("sharp");
const upload = multer({
    
    limits:1000000,
    fileFilter(req,file,cb)
    {
        if(file.originalname.endsWith(".jpeg")||file.originalname.endsWith(".jpg")||file.originalname.endsWith(".png"))
        {
            cb(undefined,true);
        }
        else{
            cb(new Error("please upload a image"));
        }
    }
})

userroute.post("/users",async (req,res)=>{
    const x = new user(req.body);

   try{

     await x.save();
     email.sendemail(x.name,x.email);
    var token = await x.generate();
    res.status(200).send({m:x,token:token});
   }
   catch(e)
   {
    res.status(401).send(e);
   }
    
   


    // x.save().then(data=>{
    //     res.send(data);
    // }).catch(err=>{
    //     res.status(400).send(err);
    // })
})

userroute.post("/users/me/avatar",auth,upload.single('av'),async(req,res)=>{

    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.image= buffer;
    await req.user.save();

    res.status(201).send();



    
},(err,req,res,next)=>{
    res.status(400).send({error:err.message});
})

userroute.delete("/users/me/avatar",auth,upload.single("up"),async (req,res)=>{
    req.user.image = undefined;
    await req.user.save();
    res.status.send();
})

userroute.get("/users/me",auth,async (req,res)=>{
    // user.find({}).then(data=>{
    //     res.send(data);
    // }).catch(err=>{
    //     res.status(400).send(err);
    // })

    res.send(req.user);
    // try{
    // var z =await user.find({});
    // res.send(z);
    // }
    // catch(e)
    // {
    //     res.send(e);
    // }


})

userroute.get("/users/:id",async (req,res)=>{
    _id=req.params.id;
    // user.findById(_id).then(data=>{
    //     res.send(data);
    // }).catch(err=>{
    //     res.status(500).send(err);
    // })
    try{
        var z = await user.findById(_id);
        res.status(200).send(z);
    }
    catch(e)
    {
        res.status(401).send(e);
    }
    

})


userroute.post("/users/login",async (req,res)=>{

    try{
var x = await user.check(req.body.password,req.body.email);
        var token =await x.generate();
        if(x)
        {
            var y = x.getpublicdata();
            console.log(y);
            res.status(200).send({k:x.getpublicdata(),tok:token});
        }
        else{
            res.status(404).send("problem with x")
        }

}
catch(e)
{   
    console.log(e);
    res.status(401).send("unable to login");
}   

})


userroute.patch("/users/me",auth,async (req,res)=>{
    var allowedupdates=["name","email","age","password"];
    var updatesrecieved = Object.keys(req.body);
    
    for(var i=0; i<updatesrecieved.length; i++)
    {   
        var x =false;
        var x = updatesrecieved[i];
        for(var j=0; j<allowedupdates.length; j++)
        {
            if(x==allowedupdates[j])
            {
                x=true;
                break;
            }

        }
        if(x==false)
        {
            break;
        }
    }

    if(x==true)
    {
            var z= req.user._id;
            try{
                var m =await user.findById(z);
                if(m)
                {
                    updatesrecieved.forEach(ele=>{
                        m[ele]=req.body[ele];
                    })
                  m=  await user.save();
                    res.status(200).send(m);
                }
                else{
                    res.status(401).send("no user found");
                }
        
            }
            catch(e)
            {
                res.status(401).send(e);
            }
            
    }


})

userroute.get("/users/:id/avatar",async (req,res)=>{
    try{
        var x = user.findOne({_id:req.params.id});
        if(!x || (!x.image) )
        {
            res.status(401).send("no such user present");
        }
        else{
            res.set("content-type","image/png");
            res.send(x.image);
        }

    }
    catch(e)
    {
        console.log("Eroor is "+e);
    }
})

userroute.delete("/users/me",auth,async (req,res)=>{
    const name = req.user.name;
    const emailname = req.user.email;
     var z = await req.user.remove();

    email.cancel(name,emailname);
    

        res.send(z);
    
    
});


module.exports= userroute;