const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //TodoApp is the name of the db
   if (err) {
    throw err;
  } else {
    console.log('Connected to mongodb server');
  }

  //deleteMany
  db.collection('Todos').deleteMany({completed: false}).then((result) => {
    console.log(result);
  })

  //deleteOne deletes the first result that it matches then stops
  // db.collection('Todos').deleteOne({completed: false}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete //deletes the specified record and returns it as object in case user wants to undo the delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })


  db.close();


});
