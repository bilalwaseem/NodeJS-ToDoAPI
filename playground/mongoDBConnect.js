const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //TodoApp is the name of the db
   if (err) {
    throw err;
  } else {
    console.log('Connected to mongodb server');
  }

  // db.collection('Todos').insertOne({
  //   text: 'Na nigga',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  //   }
  // });

  db.collection('Users').insertOne({
    name: 'Adeel',
    age: 21 ,
    location: 'Lahore'
  }, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  });

  db.close();


});
