var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    due_date: {type: Date, required: false, default: Date.now },
    description: {type: String, required: false },
    title: {type: String, required: false },
    priority: {type: String, required: false },
    complete: {type: Boolean, required: false, default: false },
    user: {type: String, required: true},
    category: {type: String, required: false }

});

var Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo;

