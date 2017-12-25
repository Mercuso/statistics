/**
 * Created by mercuso on 23.12.17.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const envLib = require('../common/lib/env');

envLib.checkForExistence([
  'DB_MONGO_USER',
  'DB_MONGO_PASSWORD',
  'DB_MONGO_DOMAIN',
  'DB_MONGO_NAME'
]);

const DB_URL = `mongodb://${process.env.DB_MONGO_DOMAIN}/${process.env.DB_MONGO_NAME}`;
const connectionOptions = {
  useMongoClient:true,
  auth:{
    user:process.env.DB_MONGO_USER,
    password:process.env.DB_MONGO_PASSWORD
  }
};

mongoose.connect(DB_URL, connectionOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
  // we're connected!
});

module.exports = {db};

