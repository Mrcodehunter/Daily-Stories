const Mysql = require('./mysql');
const StoryService = require('../services/storyService');
const UserService = require('../services/userService');

const mysqlObject = new Mysql();

exports.storyServer = new StoryService(mysqlObject.db.story);
exports.userServer = new UserService(mysqlObject.db.user);
exports.mysqlObject = mysqlObject;
