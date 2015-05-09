var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({

    beef_description: {type: String, required: true, default: 'Ground' },
    beef_title: {type: String, required: true, default: 4 },
    beef_priority: {type: String, required: false, default: '1 1/2 lb' },
    beef_category: {type: String, required: false, default: 'meat' }

});

var Recipe = mongoose.model('Recipe', todoSchema);


module.exports = Recipe;

