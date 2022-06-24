const { userServer, mysqlObject } = require('../../../database/driver');
const { usersOutput, usersInput } = require('../../../data/users');

describe('testing user service class: ', () => {
  test('create a new user', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.user, 'create').mockReturnValue(usersOutput[0]);
    const data = await userServer.createUser(usersInput[0]);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.user.create).toHaveBeenCalledTimes(1);
    expect(data).toEqual(usersOutput[0].dataValues);
  });

  test('get all users: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.user, 'findAll').mockReturnValue(usersOutput);
    const data = await userServer.getAllUser();
    const testData = usersOutput.map(function (item) {
      return item.dataValues;
    });
    expect(data).toBeTruthy();
    expect(mysqlObject.db.user.findAll).toHaveBeenCalledTimes(1);
    expect(data).toEqual(testData);
  });

  test('get user with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.user, 'findOne').mockReturnValue(usersOutput[0]);
    const data = await userServer.getUser(1);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.user.findOne).toHaveBeenCalledTimes(1);
    expect(data).toEqual(usersOutput[0].dataValues);
  });

  test('update user with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.user, 'update').mockImplementation((body, id) => {
      const data = [1];
      return data;
    });
    const data = await userServer.updateUser(usersInput[0], 1);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.user.update).toHaveBeenCalledTimes(1);
    expect(data).toEqual([1]);
  });

  test('delete user with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.user, 'destroy').mockImplementation((id) => {
      const data = [1];
      return data;
    });
    const data = await userServer.deleteUser(1);
    expect(data).toBeTruthy();
    expect(data).toBeTruthy();
    expect(mysqlObject.db.user.destroy).toHaveBeenCalledTimes(1);
    expect(data).toEqual([1]);
  });
});
// test('test TRashfiq', () => {
//   expect(2).toBe(2);
// });
