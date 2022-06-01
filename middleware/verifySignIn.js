
const {userTable} = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

checkIfUserExists = (req,res,next) => {
    userTable.findOne({
        where : {name : req.body.name}
    })
    .then ( user => {
        if(!user){
            res.status(400).send({message: "Invalid username or password!"});
            return;
        }
        if(!bcrypt.compareSync(req.body.password,user.password)){
            res.status(400).send({message: "Invalid username or password!"});
            return;
        }

        res.status(201).send({
            status : "success",
            token : jwt.sign({id:user.id,name:user.name},"secret-key-just-a-demo")
          });
    } )
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const verifySignin = checkIfUserExists;

module.exports = verifySignin;