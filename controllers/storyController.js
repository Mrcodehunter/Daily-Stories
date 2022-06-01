
const Mysql = require("../database/Mysql");
const StoryService = require("../services/storyService");


const mysqlObject = new Mysql();

const storyServiceObject = new StoryService(mysqlObject.db.story);

exports.storyTable = mysqlObject.db.story;

exports.createStory = (req, res) => {
  storyServiceObject.createStory(req,res);
};

exports.getAllStory = (req, res) => {
   storyServiceObject.getAllStory(req,res);
};

exports.getStory = (req, res) => {
  storyServiceObject.getStory(req,res);
};

exports.updateStory = (req, res) => {
  storyServiceObject.updateStory(req,res);
};

exports.deleteStory = (req, res) => {
    storyServiceObject.deleteStory(req,res);
};
