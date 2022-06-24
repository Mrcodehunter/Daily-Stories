class StoryService {
  constructor(storyTable) {
    this.storyTable = storyTable;
  }

  createStory = async (newData) => {
    const newStory = await this.storyTable.create(newData);
    //console.log(newStory);
    return newStory.dataValues;
  };

  getAllStory = async () => {
    const data = await this.storyTable.findAll();
    //console.log(data);
    var stories = data.map(function (item) {
      return item.dataValues;
    });
    //console.log(stories);
    return stories;
  };

  getStory = async (id) => {
    const story = await this.storyTable.findOne({ where: { id } });
    //console.log(story);
    return story.dataValues;
  };

  updateStory = async (body, id) => {
    const story = await this.storyTable.update(body, { where: { id } });
    //console.log(story);
    return story;
  };

  deleteStory = async (id) => {
    const story = await this.storyTable.destroy({
      where: { id },
    });
    //console.log(story);
    return story;
  };
}

module.exports = StoryService;
