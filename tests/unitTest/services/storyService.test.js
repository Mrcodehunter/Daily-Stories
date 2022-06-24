const { storyServer, mysqlObject } = require('../../../database/driver');
const { storiesInput, storiesOutput } = require('../../../data/stories');

describe('testing story service class: ', () => {
  test('create a story', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.story, 'create').mockImplementation(() => {
      return storiesOutput[0];
    });
    const data = await storyServer.createStory(storiesInput[0]);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.story.create).toHaveBeenCalledTimes(1);
    expect(data).toEqual(storiesOutput[0].dataValues);
  });

  test('get all stories: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.story, 'findAll').mockReturnValue(storiesOutput);
    const data = await storyServer.getAllStory();
    const testData = storiesOutput.map(function (item) {
      return item.dataValues;
    });
    expect(data).toBeTruthy();
    expect(mysqlObject.db.story.findAll).toHaveBeenCalledTimes(1);
    expect(data).toEqual(testData);
  });

  test('get story with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest
      .spyOn(mysqlObject.db.story, 'findOne')
      .mockReturnValue(storiesOutput[0]);
    const data = await storyServer.getStory(1);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.story.findOne).toHaveBeenCalledTimes(1);
    expect(data).toEqual(storiesOutput[0].dataValues);
  });

  test('update story with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest
      .spyOn(mysqlObject.db.story, 'update')
      .mockImplementation((body, id) => {
        const data = [1];
        return data;
      });
    const data = await storyServer.updateStory(storiesInput[0], 1);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.story.update).toHaveBeenCalledTimes(1);
    expect(data).toEqual([1]);
  });

  test('delete story with id 1: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(mysqlObject.db.story, 'destroy').mockImplementation((id) => {
      const data = [1];
      return data;
    });
    const data = await storyServer.deleteStory(1);
    expect(data).toBeTruthy();
    expect(mysqlObject.db.story.destroy).toHaveBeenCalledTimes(1);
    expect(data).toEqual([1]);
  });
});
// test('test TRashfiq', () => {
//   expect(2).toBe(2);
// });
