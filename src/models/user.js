const mongoose = require("mongoose");
const validator = require("validator");

const jwt = require("jsonwebtoken");

const bycrpt = require("bcryptjs");

const userschema = new mongoose.Schema({
    name:{
        type:String
    },age:{
        type:Number
    },
    password:{
        required:true,
        type:String,
        trim:true,
        validate(value)
        {
            if(value=="password")
            {
                throw new Error("PLEASE ENTER A STRONG PASSWORD")
            }
            else if(value.length<6)
            {
                throw new Error("PLEASE ENTER A PASSWORD GREATER THEN 6 CHARACTERS")
            }
           
        }
    },
    email:{
        type:String,
        unique:true,
        require:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("the email is not valid")
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    image:{
        type:Buffer,
        
    }
})

userschema.methods.generate = async function()
{
    const user = this;
    const token = jwt.sign({ _id:user._id.toString()},process.env.secret);
     user.tokens = user.tokens.concat({token:token});
     await user.save();
     return token;   


}

userschema.statics.check = async function(password,email)
{   
    //console.log("in this function");
    var x = await user.findOne({email:email});
    if(x)
    {
        var z =await bycrpt.compare(password,x.password);
        if(z==true)
        {
            return x;
        }
        else{
            return new Error("wrong password");
        }
    }
    else{
        return new Error("unable to login");
    }
}

userschema.pre("save",async function (next)
{
    var user= this;
    if(user.isModified("password"))
    {
        user.password = await bycrpt.hash(user.password,8);
    }

    next();
})

userschema.virtual("mytask",{
    ref:"task",
    localField:"_id",
    foreignField:"owner"
})

userschema.methods.getpublicdata=  function()
{
    const user = this;
    console.log(typeof(user));
    var x = user;
  //  delete x.password;
    //delete x.tokens;
    console.log("x is"+typeof(x));
    var userobject = user.toObject();
    delete userobject.password;
    delete userobject.tokens;
    console.log(typeof(userobject ));
    return userobject;
}

const user = mongoose.model("users",userschema);

module.exports = user;