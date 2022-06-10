const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifySignin } = require('../middleware/verifySignIn');
const verifyToken = require('../middleware/verifyToken');
const verifyUserAuthorization = require('../middleware/verifyUserAuthorization');

router
  .route('/api/v1/usersSignup')
  .post(userController.createUser);

router
  .route('/api/v1/usersSignin')
  .post(verifySignin);

router
  .route('/api/v1/users')
  .get(userController.getAllUser);

router
  .route('/api/v1/users/:id')
  .get(userController.getUser)
  .put(verifyToken, verifyUserAuthorization, userController.updateUser)
  .delete(verifyToken, verifyUserAuthorization, userController.deleteUser);

module.exports = router;
