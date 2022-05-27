const db = require("../database/mysql");
const Story = require("../models/storyModel");
exports.createStory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const newStory = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    author : req.body.author
  };
  Story.create(newStory)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getAllStory = (req, res) => {
  Story.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getStory = (req, res) => {
  Story.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updateStory = (req, res) => {
  const id = req.params.id;
  Story
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

exports.deleteStory = (req, res) => {
  const id = req.params.id;
  Story
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
