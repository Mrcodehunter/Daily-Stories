const Sequelize = require('sequelize');

class StoryModel {
  constructor(db) {
    this.story = db.define('story', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
    });
  }

  getStoryTable() {
    return this.story;
  }
}

module.exports = StoryModel;
