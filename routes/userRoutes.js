//const userServiceDaoObject = require("../dao/serviceDao").userServiceDaoObject;
const userController = require("../controllers/userController");
const verifySignin = require("../middleware/verifySignIn");
const verifyToken = require("../middleware/verifyToken");
var router = require("express").Router();

router
.route('/api/v1/usersSignup')
.post(userController.createUser);


router
.route('/api/v1/usersSignin')
.post(verifySignin);

router
.route('/api/v1/users')
.get( userController.getAllUser );

router
.route('/api/v1/users/:id')
.get( userController.getUser)
.patch( verifyToken, userController.updateUser)
.delete( verifyToken, userController.deleteUser);
  
module.exports = router;
  

