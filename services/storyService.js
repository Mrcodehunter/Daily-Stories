const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

class StoryService {
  constructor(storyTable) {
    this.storyTable = storyTable;
  }

  createStory = catchAsync(async (req, res, next) => {

    const newStory = await this.storyTable.create(req.body);

    res.status(201).send({
      status: "success",
      data: {
        story: newStory,
      },
    });

  });

  getAllStory = catchAsync(async (req, res, next) => {

    const stories = await this.storyTable.findAll();
    res.status(200).send({
      status: "success",
      data: {
        stories,
      },
    });

  });

  getStory = catchAsync(async (req, res, next) => {

    const story = await this.storyTable.findOne({
      where: { id: req.params.id },
    });
    
    if(!story) return next(new AppError("No story found with that ID",404));

    res.status(200).send({
      status: "success",
      data: {
        story,
      },
    });

  });

  updateStory = catchAsync(async (req, res, next) => {

    const story = await this.storyTable.update(req.body, {
      where: { id: req.params.id },
    });
    

    if(!story[0]) return next(new AppError("No story found with that ID",404));

    res.status(200).send({
      status: "success",
      message : "story was updated successfully"
    });

  });

  deleteStory = catchAsync(async (req, res, next) => {

    const story = await this.storyTable.destroy({
      where: { id: req.params.id },
    });

    if(!story) return next(new AppError("No story found with that ID",404));

    res.status(200).send({
      status: "success",
      data: null,
    });
  });

}

module.exports = StoryService;
