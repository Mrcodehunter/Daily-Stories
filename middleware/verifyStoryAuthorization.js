const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const mysqlObject = require("../database/driver");
const storyTable = mysqlObject.db.story;
verifyStoryAuthorization = catchAsync( async(req, res, next) => {

   const story = await storyTable.findOne({where:{id:req.params.id}});
   if(!story)return next(new AppError("No story found with that ID",404));
   if(story.author != req.body.author)return next(new AppError("Unauthorized",401));
   next();
})
module.exports = verifyStoryAuthorization;
