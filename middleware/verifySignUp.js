const dbDaoObject = require("../dao/dbDao");
const userTable = dbDaoObject.dbObject.userTable;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    userTable.findOne({
        where : {name : req.body.name}
    })
    .then ( user => {
        if(user){
            res.status(400).send({message: "Failed! Username is already in use!"});
            return;
        }
        userTable.findOne( {
            where : {email : req.body.email}
        } )
        .then( user => {
            if(user){
                res.status(400).send({message: "Failed! Email is already in use!"});
                return;
            }
            next();
        })
        .catch(err=>{
            res.status(500).send({ message: err.message });
        });
    } )
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const verifySignup = checkDuplicateUsernameOrEmail;

module.exports = verifySignup;