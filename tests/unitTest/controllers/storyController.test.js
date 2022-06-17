const { storyServer } = require('../../../database/driver');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { stories } = require('../../../data/stories');
const { createStory } = require('../../../controllers/storyController');
const storyController = require('../../../controllers/storyController');
jest.useFakeTimers();
afterEach(() => {
  jest.clearAllMocks();
});
describe('story controller testing : ', () => {
  test('testing create story : ', async () => {
    let mReq = mockRequest();
    let mRes = mockResponse();
    const nextFn = jest.fn();
    // === calling actually
    jest.mock('../../../utils/responseHandler', () =>
      jest
        .fn()
        .mockImplementation((req, res, statusCode, data, message, status) => {
          console.log('implemented');
          return res.status(statusCode).json({
            status,
            message,
            data,
          });
        })
    );
    jest.spyOn(storyServer, 'createStory').mockImplementation((mReq) => {
      const newStory = stories[0];
      return newStory;
    });

    await storyController.createStory(mReq, mRes, nextFn);
    //console.log(mockRes);
    // expect(nextFn.mock.calls.length).toBe(0);
    //expect(mRes.status).toHaveBeenCalled();
  });
});
