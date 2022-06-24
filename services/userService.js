const bcrypt = require('bcryptjs');

class UserService {
  constructor(userTable) {
    this.userTable = userTable;
  }

  createUser = async (body) => {
    const newUser = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
    };

    const data = await this.userTable.create(newUser);
    //console.log(data.dataValues);
    return data.dataValues;
  };

  getAllUser = async () => {
    const data = await this.userTable.findAll();

    //const users = { ...data[0].dataValues };
    //console.log(data);

    var users = data.map(function (item) {
      return item.dataValues;
    });

    return users;
  };

  getUser = async (id) => {
    const user = await this.userTable.findOne({ where: { id } });
    //console.log(user.dataValues);
    return user.dataValues;
  };

  updateUser = async (body, id) => {
    const newUser = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
    };
    const user = await this.userTable.update(newUser, {
      where: { id },
    });
    //console.log(user);
    return user;
  };

  deleteUser = async (id) => {
    const user = await this.userTable.destroy({
      where: { id },
    });
    //console.log(user);
    return user;
  };
}

module.exports = UserService;
