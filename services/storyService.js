
class StoryService{
    constructor(storyTable){
        this.storyTable = storyTable;
    }
    
    createStory = (req, res) => {
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
          return;
        }
        const newStory = {
          id: req.body.id,
          title: req.body.title,
          description: req.body.description,
          author : req.body.author
        };
        this.storyTable.create(newStory)
          .then((data) => {
            res.status(201).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      getAllStory = (req, res) => {
        this.storyTable.findAll()
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      
      getStory = (req, res) => {
        this.storyTable.findAll({ where: { id: req.params.id } })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      };
      
      updateStory = (req, res) => {
        const id = req.params.id;
        this.storyTable
          .update(req.body, {
            where: { id: id },
          })
          .then(() => {
            res.status(200).send({
              message: "Story was updated successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error updating story with id= ${id}`,
            });
          });
      };
      
      deleteStory = (req, res) => {
        const id = req.params.id;
        this.storyTable
          .destroy({
            where: { id: id },
          })
          .then(() => {
            res.status(200).send({
              message: "Story was deleted successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Could not delete story with id= ${id}`,
            });
          });
      };
      
}


module.exports = StoryService;