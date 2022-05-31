const userServiceDaoObject = require("../dao/serviceDao").userServiceDaoObject;
const verifySignup = require("../middleware/verifySignUp");
const verifySignin = require("../middleware/verifySignIn");
const verifyToken = require("../middleware/verifyToken");
var router = require("express").Router();

router
.route('/api/v1/usersSignup')
.post(verifySignup, userServiceDaoObject.createUser);


router
.route('/api/v1/usersSignin')
.post(verifySignin);

router
.route('/api/v1/users')
.get(verifyToken, userServiceDaoObject.getAllUser );

router
.route('/api/v1/users/:id')
.get(verifyToken, userServiceDaoObject.getUser)
.patch(verifyToken, userServiceDaoObject.updateUser)
.delete(verifyToken, userServiceDaoObject.deleteUser);
  
module.exports = router;
  

