const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifySignin } = require('../middleware/verifySignIn');
const verifyToken = require('../middleware/verifyToken');
const verifyUserAuthorization = require('../middleware/verifyUserAuthorization');

router
  .route('/signup')
  .post(userController.createUser);

router
  .route('/signin')
  .post(verifySignin);

router
  .route('/users')
  .get(userController.getAllUser);

router
  .route('/users/:id')
  .get(userController.getUser)
  .put(verifyToken, verifyUserAuthorization, userController.updateUser)
  .delete(verifyToken, verifyUserAuthorization, userController.deleteUser);

module.exports = router;
