const { storyServer, mysqlObject } = require('../../../database/driver');
const { stories } = require('../../../data/stories');

afterEach(() => {
  jest.clearAllMocks();
});

describe('testing story service class: ', () => {
  test('create a story', async () => {
    jest.spyOn(mysqlObject.db.story, 'create').mockImplementation(() => {
      const newStory = {
        id: 1,
        title: 'story1',
        description: 'vgsdfbgdfxbhdfgxbhruivfhsdeovkliua',
        author: 'user1',
        updatedAt: '2022-06-15T09:46:33.421Z',
        createdAt: '2022-06-15T09:46:33.421Z',
      };
      return newStory;
    });
    const data = await storyServer.createStory(stories[0]);
    expect(data).toBeTruthy();
    expect(data).toEqual(stories[0]);
  });

  test('get all stories: ', async () => {
    jest.spyOn(mysqlObject.db.story, 'findAll').mockReturnValue(stories);
    const data = await storyServer.getAllStory();
    expect(data).toBeTruthy();
  });

  test('get story with id 1: ', async () => {
    jest.spyOn(mysqlObject.db.story, 'findOne').mockReturnValue(stories[0]);
    const data = await storyServer.getStory(1);
    expect(data).toBeTruthy();
  });

  test('update story with id 1: ', async () => {
    jest
      .spyOn(mysqlObject.db.story, 'update')
      .mockImplementation((body, id) => {
        const data = [1];
        return data;
      });
    const data = await storyServer.updateStory(stories[0], 1);
    expect(data).toBeTruthy();
  });

  test('delete story with id 1: ', async () => {
    jest.spyOn(mysqlObject.db.story, 'destroy').mockImplementation((id) => {
      const data = [1];
      return data;
    });
    const data = await storyServer.deleteStory(1);
    expect(data).toBeTruthy();
  });
});
