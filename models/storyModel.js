const Sequelize = require("sequelize");
module.exports = (sequelize)=>{
    const story = sequelize.define("story",{
        id : {
            type : Sequelize.STRING,
            primaryKey : true
        },
        title :{
            type : Sequelize.STRING
        },
        description :{
            type : Sequelize.STRING
        },
        author:{
            type: Sequelize.STRING
        }
    });
    return story;
}