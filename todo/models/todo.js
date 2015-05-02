var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    due_date: {type: Date, required: true, default: Date.now },
    description: {type: String, required: true, default: ''},
    title: {type: String, required: true, default: ''},
    priority: {type: String, required: true, default: 1 },
    complete: {type: Boolean, required: true, default: false },
    user: {type: String, required: true},
    category: {type: String, required: true, default: false },

});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
