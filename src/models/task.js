const mongoose = require("mongoose");
const validator = require("validator");

const taskschema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    }
})

taskschema.pre("save",async function(next)
{
    var task = this;
    next();
})

const task =  mongoose.model("tasks",taskschema);

module.exports=task;