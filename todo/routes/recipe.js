var UserController = require('../userController');
var express = require('express');
var router = express.Router();
var recipeList = [];

// Include the model for a Todo that we set up in Mongoose
var Recipe = require('../models/recipe');




// Send the error message back to the client
var sendError = function (req, res, err, message) {
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

// Send the todo list back to the client
var sendRecipeList = function (req, res, next) {

//get the currenlty logged in user object
  var theUser = UserController.getCurrentUser();


  Recipe.find({}, function (err, recipes) {

// swap out the user._id for user.username
  
  //Loop over the recipes array
  for (var j = 0; j < recipes.length; j++) {
    recipes[j].user = theUser.username;
  };

    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get recipe list");
    } else {
      res.render("recipeList", {
        title: "List of tasks",
        message: "Things You Need to Buy from Whole Goods",
        showUser: theUser.username,
        recipes: recipes
      });
    }
  });
};

// Handle a GET request from the client to /todo/list
router.get('/list', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  sendRecipeList(req, res, next);
});

// Handle a GET request from the client to /todo/:id
router.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  Recipe.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a task with that id");

    // Find was successful
    } else {
      res.render('recipe', {
        title : 'Express Todo Example',
        recipe: thisItem
      });
    }
  });
});



// Handle a GET request from the client to /todo
router.get('/', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/");
  }

  // Send the todo form back to the client
  res.render('recipe', {
    title : 'Express Todo Example',
    recipe: {
      // title: '',
      // description: '',
      // priority: 1,
      // due_date: new Date(),
      // complete: false,
      beef_description: 'Ground',
      beef_title:  4,
      beef_priority: '1 1/2 lb',
      beef_category: 'meat' 
    }
  });
});


// Handle a DELETE request from the client to /todo
router.delete('/', function (req, res) {
  Recipe.find({ _id: req.body.recipe_id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the task");

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });
});

// Handle a POST request from the client to /todo
router.post('/', function (req, res, next) {

  // User is editing an existing item
  if (req.body.db_id !== "") {

    // Find it
    Recipe.findOne({ _id: req.body.db_2id }, function (err, foundRecipe) {

      if (err) {
        sendError(req, res, err, "Could not find that task");
      } else {
        // Found it. Now update the values based on the form POST data.
        foundRecipe.beef_title = req.body.beef_title;
        foundRecipe.beef_description = req.body.beef_description;
        foundRecipe.beef_priority = req.body.beef_priority;
        foundRecipe.beef_category = req.body.beef_category;
        foundRecipe.due_date = req.body.due_date;
        foundRecipe.beef_complete = (req.body.complete) ? req.body.complete : false;

        // Save the updated item.
        foundRecipe.save(function (err, newOne) {
          if (err) {
            sendError(req, res, err, "Could not save task with updated information");
          } else {
            res.redirect('/todo/list');
          }
        });
      }
    });

  // User created a new item
  } else {

    // Who is the user?
    var theUser = UserController.getCurrentUser();

    // What did the user enter in the form?
    var theFormPostData = req.body
    theFormPostData.user = theUser._id;

    console.log('theFormPostData',theFormPostData);


    var myrecipe = new Recipe(theFormPostData);

    mytodo.save(function (err, recipe) {
      if (err) {
        sendError(req, res, err, "Failed to save task");
      } else {
        res.redirect('/todo/list');
      }
    });
  }
});



module.exports = router;
