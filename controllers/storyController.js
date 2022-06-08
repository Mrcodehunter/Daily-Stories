/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const StoryService = require('../services/storyService');
const mysqlObject = require('../database/driver');
const responseHandler = require('../utils/responseHandler');

const storyServiceObject = new StoryService(mysqlObject.db.story);

exports.createStory = catchAsync(async (req, res, next) => {
  const newStory = await storyServiceObject.createStory(req.body);

  responseHandler(req, res, 201, newStory, 'created', 'success');
});

exports.getAllStory = catchAsync(async (req, res, next) => {
  const stories = await storyServiceObject.getAllStory();

  responseHandler(req, res, 200, stories, 'send all stories', 'success');
});

exports.getStory = catchAsync(async (req, res, next) => {
  const story = await storyServiceObject.getStory(req.params.id);

  if (!story) return next(new AppError('No story found with that ID', 404));

  responseHandler(req, res, 200, story, 'send the story', 'success');
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await storyServiceObject.updateStory(req.body, req.params.id);

  if (!story[0]) { return next(new AppError('No story found with that ID', 404)); }

  responseHandler(req, res, 200, story, 'story was updated successfully', 'success');
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyServiceObject.deleteStory(req.params.id);

  if (!story) return next(new AppError('No story found with that ID', 404));

  responseHandler(req, res, 204, null, 'story was deleted successfully', 'success');
});
