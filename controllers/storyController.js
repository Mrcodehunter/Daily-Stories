/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const responseHandler = require('../utils/responseHandler');

const { storyServer } = require('../database/driver');

exports.createStory = catchAsync(async (req, res, next) => {
  const newStory = await storyServer.createStory(req.body);
  //console.log(newStory);
  responseHandler(req, res, 201, newStory, 'new story created', 'success');
});

exports.getAllStory = catchAsync(async (req, res, next) => {
  const stories = await storyServer.getAllStory();
  //console.log(stories);
  responseHandler(req, res, 200, stories, 'send all stories', 'success');
});

exports.getStory = catchAsync(async (req, res, next) => {
  const story = await storyServer.getStory(req.params.id);
  //console.log(story);
  if (!story) return next(new AppError('No story found with that ID', 404));
  //console.log('why?');
  responseHandler(req, res, 200, story, 'send the story', 'success');
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await storyServer.updateStory(req.body, req.params.id);
  //console.log(story);
  if (!story[0]) {
    return next(new AppError('No story found with that ID', 404));
  }
  const data = await storyServer.getStory(req.params.id);
  responseHandler(
    req,
    res,
    200,
    data,
    'story was updated successfully',
    'success'
  );
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyServer.deleteStory(req.params.id);
  //console.log(story);
  if (!story) return next(new AppError('No story found with that ID', 404));

  responseHandler(req, res, 204, null, null, null);
});
