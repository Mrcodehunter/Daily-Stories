const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

verifyToken = (req,res,next) =>{
  const token = req.body.token;
  if(!token){
      return res.status(403).send({
          message : "No token provided!"
      });
  }
  jwt.verify(token,"secret-key-just-a-demo",(err,data)=>{
    if(err){
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    //req.userId = data.id;
    //req.author = data.name;
    //console.log(data);
    //console.log("23");
    next();
  });
}

module.exports = verifyToken;