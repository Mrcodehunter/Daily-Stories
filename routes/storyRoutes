const storyController = require("../controllers/storyController.js");
//const storyServiceDaoObject = require("../dao/serviceDao").storyServiceDaoObject;
const verifyToken = require("../middleware/verifyToken");
var router = require("express").Router();

router
    .route('/api/v1/stories')
    .post(verifyToken, storyController.createStory)
    .get( storyController.getAllStory);

router
    .route('/api/v1/stories/:id')
    .get( storyController.getStory)
    .patch(verifyToken, storyController.updateStory)
    .delete(verifyToken, storyController.deleteStory);

module.exports = router


