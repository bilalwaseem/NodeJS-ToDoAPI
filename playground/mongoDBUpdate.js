// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //TodoApp is the name of the db
   if (err) {
    throw err;
  } else {
    console.log('Connected to mongodb server');
  }

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59cac07eeb2c8e1fdc800eb2') //filter
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59cac3d216a5101ee816c4c4')
  }, {
    $set: {
      name: 'Adeel'
    }
  }, {
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });



  db.close();


});
