const responseHandler = require('../../../utils/responseHandler');
const mocks = require('node-mocks-http');
const { storiesOutput } = require('../../../data/stories');

describe('testing responseHandler', () => {
  test('test application/xml', () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest({
      headers: {
        accept: 'application/xml',
      },
      params: {
        id: 1,
      },
    });
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    responseHandler(
      req,
      res,
      200,
      storiesOutput[0].dataValues,
      'send xml data',
      ''
    );

    const data = res._getData();
    const headers = res._getHeaders();
    expect(res.statusCode).toBe(200);
    expect(headers['content-type']).toBe('application/xml');
  });

  test('test text/html', () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest({
      headers: {
        accept: 'text/html',
      },
      params: {
        id: 1,
      },
    });
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    responseHandler(
      req,
      res,
      200,
      storiesOutput[0].dataValues,
      'send html data',
      ''
    );

    const data = res._getData();
    const headers = res._getHeaders();
    expect(res.statusCode).toBe(200);
    expect(headers['content-type']).toBe('text/html');
  });

  test('test plainText', () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest({
      headers: {
        accept: 'text/plain',
      },
      params: {
        id: 1,
      },
    });
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    responseHandler(
      req,
      res,
      200,
      storiesOutput[0].dataValues,
      'send plainText data',
      ''
    );

    const data = res._getData();
    const headers = res._getHeaders();
    expect(res.statusCode).toBe(200);
    expect(headers['content-type']).toBe('text/plain');
  });
  test('test jsonData', () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest({
      headers: {
        accept: '',
      },
      params: {
        id: 1,
      },
    });
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    responseHandler(
      req,
      res,
      200,
      storiesOutput[0].dataValues,
      'send json data',
      ''
    );

    const jsonData = res._getJSONData();
    const headers = res._getHeaders();
    expect(res.statusCode).toBe(200);
    expect(headers['content-type']).toBe('application/json');
    expect(jsonData.data).toEqual(storiesOutput[0].dataValues);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('send json data');
  });
});
