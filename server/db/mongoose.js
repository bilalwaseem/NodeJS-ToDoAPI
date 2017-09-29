var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var con =  'mongodb://bilalwaseem:fuhrer121@ds159377.mlab.com:59377/todoapp_dev';
mongoose.connect(con || 'mongodb://localhost:27017/TodoApp', { useMongoClient: true });

module.exports = {mongoose};
