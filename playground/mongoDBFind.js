const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //TodoApp is the name of the db
   if (err) {
    throw err;
  } else {
    console.log('Connected to mongodb server');
  }

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => { //then is a promise
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => { //then is a promise
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  db.collection('Users').find({age: 22}).count().then((count) => {
    console.log(`Records with age 22: ${count}`);
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });


  db.collection('Users').find({age: 22}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });



  db.close();


});
