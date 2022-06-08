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

    return data;
  };

  getAllUser = async () => {
    const users = await this.userTable.findAll();

    return users;
  };

  getUser = async (id) => {
    const user = await this.userTable.findOne({ where: { id } });
    return user;
  };

  updateUser = async (body, id) => {
    const user = await this.userTable.update(body, {
      where: { id },
    });
    return user;
  };

  deleteUser = async (id) => {
    const user = await this.userTable.destroy({
      where: { id },
    });

    return user;
  };
}

module.exports = UserService;
