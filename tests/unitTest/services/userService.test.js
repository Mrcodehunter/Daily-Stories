const { userServer, mysqlObject } = require('../../../database/driver');
const { users } = require('../../../data/users');
// const { mockRequest, mockRespone } = require('jest-mock-req-res');
// jest.useFakeTimers();
afterEach(() => {
  jest.clearAllMocks();
});
describe('testing user service class: ', () => {
  test('create a new user', async () => {
    const body = { name: users[0].name, email: users[0].email, password: 1234 };
    jest.spyOn(mysqlObject.db.user, 'create').mockImplementation((body) => {
      const newUser = {
        id: 1,
        name: 'user1',
        email: 'user1@gmail.com',
        password:
          '$2a$08$YyAd2CsR5ogxBugjzxhS9ekUCR6V2anBbqjG3vxn.J/mvUiwAnXvm',
        updatedAt: '2022-06-15T09:45:18.145Z',
        createdAt: '2022-06-15T09:45:18.145Z',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjU1Mjg2MzE4LCJleHAiOjE2NTYxNTAzMTh9.24RBe_z7g7mzGAOYgmrDwdR6uq9xIGZho4Y20NTvGts',
      };
      return newUser;
    });
    const data = await userServer.createUser(users[0]);
    expect(data).toBeTruthy();
    expect(data).toEqual(users[0]);
  });

  test('get all users: ', async () => {
    jest.spyOn(mysqlObject.db.user, 'findAll').mockReturnValue(users);
    const data = await userServer.getAllUser();
    expect(data).toBeTruthy();
  });

  test('get user with id 1: ', async () => {
    jest.spyOn(mysqlObject.db.user, 'findOne').mockReturnValue(users[0]);
    const data = await userServer.getUser(1);
    expect(data).toBeTruthy();
  });

  test('update user with id 1: ', async () => {
    jest.spyOn(mysqlObject.db.user, 'update').mockImplementation((body, id) => {
      const data = [1];
      return data;
    });
    const data = await userServer.updateUser(users[0], 1);
    expect(data).toBeTruthy();
  });

  test('delete user with id 1: ', async () => {
    jest.spyOn(mysqlObject.db.user, 'destroy').mockImplementation((id) => {
      const data = [1];
      return data;
    });
    const data = await userServer.deleteUser(1);
    expect(data).toBeTruthy();
  });
});
