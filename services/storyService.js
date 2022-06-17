class StoryService {
  constructor(storyTable) {
    this.storyTable = storyTable;
  }

  createStory = async (newData) => {
    const newStory = await this.storyTable.create(newData);
    return newStory;
  };

  getAllStory = async () => {
    const stories = await this.storyTable.findAll();
    return stories;
  };

  getStory = async (id) => {
    const story = await this.storyTable.findOne({ where: { id } });
    return story;
  };

  updateStory = async (body, id) => {
    const story = await this.storyTable.update(body, { where: { id } });
    return story;
  };

  deleteStory = async (id) => {
    const story = await this.storyTable.destroy({
      where: { id },
    });
    return story;
  };
}

module.exports = StoryService;
