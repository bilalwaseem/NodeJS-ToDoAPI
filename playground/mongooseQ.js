const {mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

var id = '59cce6b928ebf32e70590928';
var u_id = '59cbf9799b51c72fa498af3a';

Todo.find({
  _id: id
}).then((todos) => {
  if (!todos) {
    return console.log('ID not found');
  }
  console.log('Todos', todos);
}, (err) => {
  console.log(err);
});

Todo.findOne({ //find the 1st instance only.. used when we need to find by detail other than id
  _id: id
}).then((todos) => {
  if (!todos) {
    return console.log('ID not found');
  }
  console.log('Todos', todos);
}, (err) => {
  console.log(err);
});

Todo.findById(id).then((todos) => {
  if (!todos) {
    return console.log('ID not found');
  }
  console.log('By ID:', todos);
}, (err) => {
  console.log(err);
});

User.findById(u_id).then((users) => {
  if (!users) {
    return console.log('ID not found');
  }
  console.log('By ID:', users);
}, (err) => {
  console.log(err);
});
