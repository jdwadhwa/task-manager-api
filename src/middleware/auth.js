
const jwt = require("jsonwebtoken");

const user  = require("../models/user");



const auth = async(req,res,next)=>{

    try{
            var token  =  req.header("Authorization").replace("Bearer ","");
            const decoded =  jwt.verify(token,"thisisasecretkey");
            const x = await user.findOne({_id:decoded._id,"tokens.token":token});
            if(!x)
            {
                throw new Error();
            }
            req.token =  token;
            req.user = x;
            next();
    }
    catch(e)
    {
        res.status(401).send({"error":"please authenticate the user"});
    }
    
    
}

module.exports = auth;