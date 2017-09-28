const chai = require('chai');
const request = require('supertest');

var expect = chai.expect;
var {app} = require('./../server'); //equal to var app = require("./../server").app
var {Todo} = require('./../models/todo');

const todos = [{
  text: 'first todo'
}, {
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
  })
})
