const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService{
    constructor(userTable){
        this.userTable = userTable;
    }

    createUser = (req, res) => {
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
          return;
        }
        console.log(req.body);
        const newUser = {
          //id: req.body.id,
           // just another comment 
          
          name: req.body.name,
          email : req.body.email,
          password : bcrypt.hashSync(req.body.password,8)
        };
        this.userTable.create(newUser)
          .then((data) => {
            res.status(201).send({
              status : "success",
              data,
              token : jwt.sign(data.id,"secret-key-just-a-demo")
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      
      getAllUser = (req, res) => {
        this.userTable.findAll()
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      
      getUser = (req, res) => {
        this.userTable.findAll({ where: { id: req.params.id } })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      
      updateUser = (req, res) => {
        const id = req.params.id;
        this.userTable
          .update(req.body, {
            where: { id: id },
          })
          .then(() => {
            res.status(200).send({
              message: "Story was updated successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error updating story with id= ${id}`,
            });
          });
      };
      
      deleteUser = (req, res) => {
        const id = req.params.id;
        this.userTable
          .destroy({
            where: { id: id },
          })
          .then(() => {
            res.status(200).send({
              message: "Story was deleted successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Could not delete story with id= ${id}`,
            });
          });
      };
      
}

module.exports = UserService;