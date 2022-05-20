const Sequelize = require("sequelize");
module.exports = (sequelize)=>{
    const user = sequelize.define("user",{
        id : {
            type : Sequelize.STRING,
            primaryKey : true
        },
        name :{
            type : Sequelize.STRING
        }
        
    });
    return user;
}