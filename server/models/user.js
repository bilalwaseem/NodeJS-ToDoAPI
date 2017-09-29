const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
//token concepts: when user logins we provide him with a token which includes his id, some msg and a salt i.e secret.When ever a user calls a route, his token is checked with the provided one to make sure he is not breaching our security i.e using a diff id to hack. if so, we log out him

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minglength: 6
  },
  tokens: [{
     access: {
       type: String,
       require: true
     },
     token: {
       type: String,
       required: true
     }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); //making a token including userid+access+salt
  user.tokens.push({access, token}); //eauals access:access token:token


  return user.save().then(() => { // for returning to server to check
    return token;
  }, (err) => {
    console.log(err);
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
