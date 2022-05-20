const users = require("../controllers/userController.js");
var router = require("express").Router();
module.exports = app => {

  router.post("/", users.createUser);
  router.get("/", users.getAllUser);
  router.get("/:id", users.getUser);
  router.patch("/:id", users.updateUser);
  router.delete("/:id", users.deleteUser);
  app.use('/api/v1/users', router);

 };
