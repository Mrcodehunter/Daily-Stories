const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

class UserService {
  constructor(userTable) {
    this.userTable = userTable;
  }

  createUser = catchAsync(async (req, res, next) => {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };

    const data = await this.userTable.create(newUser);

    res.status(201).send({
      status: "success",
      data: {
        user: data,
      },
      token: jwt.sign({ id: data.id, name: data.name },"secret-key-just-a-demo"),
    });
  });

  getAllUser = catchAsync(async (req, res, next) => {
    const users = await this.userTable.findAll();

    res.status(200).send({
      status: "success",
      data: {
        users,
      },
    });
  });

  getUser = catchAsync(async (req, res, next) => {
    const user = await this.userTable.findOne({ where: { id: req.params.id } });
    
    if(!user) return next(new AppError("No user found with that ID",404));

    res.status(200).send({
      status: "success",
      data: {
        user,
      },
    });
  });

  updateUser = catchAsync(async (req, res, next) => {
    const user = await this.userTable.update(req.body, {
      where: { id: req.params.id },
    });
    
    if(!(user[0])) return next(new AppError("No user found with that ID",404));

    res.status(200).send({
      status: "success",
      message : "user was updated successfully!"
    });
  });

  deleteUser = catchAsync(async (req, res, next) => {
    const user = await this.userTable.destroy({
      where: { id: req.params.id },
    });
    
    if(!user) return next(new AppError("No user found with that ID",404));

    res.status(200).send({
      status: "success",
      data: null,
    });
  });
}

module.exports = UserService;
