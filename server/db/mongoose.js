var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// var con =  'mongodb://bilaldb:mongolab@ds159377.mlab.com:59377/todoapp_dev';
var loc = 'mongodb://localhost:27017/TodoApp';
mongoose.connect(loc, { useMongoClient: true });

module.exports = {mongoose};
