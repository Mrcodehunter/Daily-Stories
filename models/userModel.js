const Sequelize = require("sequelize");
module.exports = (sequelize)=>{
    const user = sequelize.define("user",{
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        name :{
            type : Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: { isEmail: true },
          },
        password : {
            type : Sequelize.STRING
        }
        
    });
    return user;
}