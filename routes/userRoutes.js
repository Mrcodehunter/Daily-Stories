const userServiceDaoObject = require("../dao/serviceDao").userServiceDaoObject;
var router = require("express").Router();
module.exports = app => {

  router.post("/", userServiceDaoObject.createUser);
  router.get("/", userServiceDaoObject.getAllUser);
  router.get("/:id", userServiceDaoObject.getUser);
  router.patch("/:id", userServiceDaoObject.updateUser);
  router.delete("/:id", userServiceDaoObject.deleteUser);
  app.use('/api/v1/users', router);

 };
