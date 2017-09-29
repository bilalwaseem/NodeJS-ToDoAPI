const express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //middleware

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
});


app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  Todo.findById(id).then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.send({todos});
  }, (err) => {
    res.status(404).send(err);
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  Todo.findByIdAndRemove(id).then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.send({todos})
  }, (err) => {
    res.status(404).send(err);
  })
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todos) => {  //passed id, toSet, return new result
    if (!todos) {
      return res.status(404).send();
    }
    res.send({todos});
  }, (err) => {
    res.status(400).send();
  })

});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});



module.exports = {app};
