
const Mysql = require("../database/Mysql");
const StoryService = require("../services/storyService");
const {storyTable}= require("../database/driver");

const storyServiceObject = new StoryService(storyTable);

//exports.storyTable = mysqlObject.db.story;

exports.createStory = (req, res, next) => {
  storyServiceObject.createStory(req,res, next);
};

exports.getAllStory = (req, res, next) => {
   storyServiceObject.getAllStory(req,res, next);
};

exports.getStory = (req, res, next) => {
  storyServiceObject.getStory(req,res, next);
};

exports.updateStory = (req, res, next) => {
  storyServiceObject.updateStory(req,res, next);
};

exports.deleteStory = (req, res, next) => {
    storyServiceObject.deleteStory(req,res, next);
};
