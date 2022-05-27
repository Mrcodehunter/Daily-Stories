class Driver{
    constructor(obj){
        this.dbObject=obj;
        this.dbObject.db.sync();
    }
    // syncDatabase(){
    //    this.db.sync();
    // }
    createStoryTable(tableName) {
        this.dbObject.storyTable = this.dbObject.createTable(tableName);
     }
     createUserTable(tableName) {
        this.dbObject.userTable = this.dbObject.createTable(tableName);
     }
}

module.exports = Driver;