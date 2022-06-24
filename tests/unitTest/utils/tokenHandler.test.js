const jwt = require('jsonwebtoken');
const tokenHandler = require('../../../utils/tokenHandler');
const { usersToken, usersInput } = require('../../../data/users');
describe('testing token handler', () => {
  test('test createToken method', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(jwt, 'sign').mockReturnValue(usersToken[0]);
    const token = await tokenHandler.createToken(1, usersInput[0].name);
    expect(token).toBeTruthy();
    expect(token).toBe(usersToken[0]);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });
  test('test verifyToken method', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest
      .spyOn(jwt, 'verify')
      .mockReturnValue({ id: 1, name: usersInput[0].name });
    const data = await tokenHandler.verifyToken(1, usersInput[0].name);
    expect(data).toBeTruthy();
    expect(data.id).toBe(1);
    expect(data.name).toBe(usersInput[0].name);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });
});
