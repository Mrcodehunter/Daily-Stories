const jwt = require("jsonwebtoken");

exports.createToken = async( id, name) => {
    token = await jwt.sign({ id: id, name: name },process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    return token;
}

exports.verifyToken =async(token) => {
     const data = await jwt.verify(token, process.env.JWT_SECRET);
     return data; 
}