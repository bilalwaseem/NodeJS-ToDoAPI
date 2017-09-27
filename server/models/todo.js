var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', { //model for todo
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //removes whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
