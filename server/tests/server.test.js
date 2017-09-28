const chai = require('chai');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var expect = chai.expect;
var {app} = require('./../server'); //equal to var app = require("./../server").app
var {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first todo'
}, {
  _id: new ObjectID(),
  text: '2nd todo'
}];

beforeEach((done) => { //for testing post
  Todo.remove({}).then(() => {  //removes all docs/items
    return Todo.insertMany(todos);
  }).then(() => done());
});


// beforeEach((done) => { //for testing post
//   Todo.remove({}).then(() => done()); //removes all docs/items
// });

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Text todo text';

    request(app)
      .post('/todos') //define route
      .send({text})
      .expect(200) //expect to be 200 status
      .expect((res) => {
         expect(res.body.text).to.equal(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).to.equal(1);
          expect(todos[0].text).to.equal(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).to.equal(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).to.equal(2);
      })
      .end(done);
  });
});

describe('GET /todos:id', () => {

  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).to.equal(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 todo not found', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos:id', () => {

  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id).to.equal(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).to.not.exist;
          done();
        }, (err) => {
          res.status(404).send(err);
        })
      });
  });

  it('should return 404 todo not found', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
