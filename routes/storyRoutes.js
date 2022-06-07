const storyController = require("../controllers/storyController.js");
const verifyToken = require("../middleware/verifyToken");
const verifyStoryAuthorization = require("../middleware/verifyStoryAuthorization");
var router = require("express").Router();

router
    .route('/api/v1/stories')
    .post(verifyToken, storyController.createStory)
    .get( storyController.getAllStory);

router
    .route('/api/v1/stories/:id')
    .get( storyController.getStory)
    .patch(verifyToken, verifyStoryAuthorization,storyController.updateStory)
    .delete(verifyToken, verifyStoryAuthorization,storyController.deleteStory);

module.exports = router


