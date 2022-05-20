const db = require("../models/server");
const User = db.users;

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const newUser = {
    id: req.body.id,
    name: req.body.name,
    email : req.body.email,
    password : req.body.password
  };
  User.create(newUser)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getAllUser = (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getUser = (req, res) => {
  User.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  User
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

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User
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
