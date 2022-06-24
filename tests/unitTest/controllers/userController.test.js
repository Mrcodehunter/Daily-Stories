const { userServer } = require('../../../database/driver');
const mocks = require('node-mocks-http');
const { usersInput, usersOutput, usersToken } = require('../../../data/users');
const userController = require('../../../controllers/userController');
const tokenHandler = require('../../../utils/tokenHandler');

jest.mock('../../../utils/responseHandler');
const responseHandler = require('../../../utils/responseHandler');

describe('Testing user controller', () => {
  test('testing createUser method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest
      .spyOn(userServer, 'createUser')
      .mockReturnValue(usersOutput[0].dataValues);
    jest.spyOn(tokenHandler, 'createToken').mockReturnValue(usersToken[0]);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 201;
        return res.json({
          status: 'success',
          message: 'story created successfully',
          data: usersOutput[0].dataValues,
        });
      }
    );
    await userController.createUser(req, res, nextFn);

    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(jsonData.data).toEqual(usersOutput[0].dataValues);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('story created successfully');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(userServer.createUser).toHaveBeenCalledTimes(1);
    expect(tokenHandler.createToken).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing getAllUser method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(userServer, 'getAllUser').mockImplementation(() => {
      var users = usersOutput.map(function (item) {
        return item.dataValues;
      });
      return users;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent all user data',
          data: usersOutput.map(function (item) {
            return item.dataValues;
          }),
        });
      }
    );
    await userController.getAllUser(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('sent all user data');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(userServer.getAllUser).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });
  test('testing getUser method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(userServer, 'getUser').mockImplementation(() => {
      return usersOutput[0].dataValues;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent user data',
          data: usersOutput[0].dataValues,
        });
      }
    );
    await userController.getUser(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('sent user data');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(userServer.getUser).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing updateUser method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(userServer, 'updateUser').mockReturnValue([1]);
    jest
      .spyOn(userServer, 'getUser')
      .mockReturnValue(usersOutput[0].dataValues);
    jest.spyOn(tokenHandler, 'createToken').mockReturnValue(usersToken[0]);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'user was updated successfully!',
          data: usersOutput[0].dataValues,
        });
      }
    );
    await userController.updateUser(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.data).toEqual(usersOutput[0].dataValues);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('user was updated successfully!');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(userServer.updateUser).toHaveBeenCalledTimes(1);
    expect(userServer.getUser).toHaveBeenCalledTimes(1);
    expect(tokenHandler.createToken).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing deleteUser method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(userServer, 'deleteUser').mockReturnValue([1]);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 204;
        return res.json({
          status: 'success',
          message: 'user was deleted successfully!',
          data: {},
        });
      }
    );
    await userController.deleteUser(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(204);
    expect(jsonData.data).toEqual({});
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('user was deleted successfully!');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(userServer.deleteUser).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing getUser method with no data : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('Some Error Occurred');
      return err;
    };

    jest.spyOn(userServer, 'getUser').mockImplementation(() => {
      return 0;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent user data',
          data: usersOutput[0].dataValues,
        });
      }
    );
    const err = await userController.getUser(req, res, nextFn);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing updateUser method with no data : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('Some Error Occurred');
      return err;
    };

    jest.spyOn(userServer, 'updateUser').mockReturnValue([0]);
    jest
      .spyOn(userServer, 'getUser')
      .mockReturnValue(usersOutput[0].dataValues);
    jest.spyOn(tokenHandler, 'createToken').mockReturnValue(usersToken[0]);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'user was updated successfully!',
          data: usersOutput[0].dataValues,
        });
      }
    );
    const err = await userController.updateUser(req, res, nextFn);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing deleteUser method with no data : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('Some Error Occurred');
      return err;
    };

    jest.spyOn(userServer, 'deleteUser').mockReturnValue(0);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 204;
        return res.json({
          status: 'success',
          message: 'user was deleted successfully!',
          data: {},
        });
      }
    );
    const err = await userController.deleteUser(req, res, nextFn);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });

  // test('testing catchAsync method using invalid token: ', async () => {
  //   jest.clearAllMocks();
  //   jest.resetAllMocks();
  //   const req = mocks.createRequest({
  //     body: usersInput[0],
  //   });
  //   const res = mocks.createResponse();
  //   const nextFn = (err) => {
  //     //console.log('Some Error Occurred');
  //     return err;
  //   };

  //   jest.spyOn(userServer, 'createUser').mockReturnValue(0);
  //   //jest.spyOn(tokenHandler, 'createToken').mockReturnValue(usersToken[0]);

  //   responseHandler.mockImplementation(
  //     (req, res, statusCode, data, message, status) => {
  //       res.statusCode = 201;
  //       return res.json({
  //         status: 'success',
  //         message: 'story created successfully',
  //         data: usersOutput[0].dataValues,
  //       });
  //     }
  //   );
  //   const err = await userController.createUser(req, res, nextFn);

  //   console.log(err);

  //   jest.unmock('../../../utils/responseHandler');
  // });
});

// node-mock-htttp
// test('test TRashfiq', () => {
//   expect(2).toBe(2);
// });
