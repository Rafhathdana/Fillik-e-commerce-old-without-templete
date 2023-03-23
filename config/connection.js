const MongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};
module.exports = {
  connect: (done) => {
    const Mongo = MongoClient.connect("mongodb://localhost:27017");
    Mongo.then(async (client) => {
      state.db = client.db("fillik");
      done();
    }).catch((err) => {
      console.log("Mongo error:" + err);
    });
  },
  get: () => {
    return state.db;
  },
};
