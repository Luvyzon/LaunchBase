const Recipe = require('../models/recipe.js')

module.exports = {
  index (req, res) {
    Recipe.all(function (recipes) {
      Recipe.findChefRecipeList(function (chef) {
        return res.render('admin/recipes/index', { recipes, chef })
      })
    })
  },
  create (req, res) {
    Recipe.find(function (chefs) {
      return res.render('admin/recipes/create', { chefs })
    })
  },
  show (req, res) {
    Recipe.findByID(req.params.id, function (recipe) {
      Recipe.findChefRecipe(req.params.id, function (chef) {
        return res.render('admin/recipes/show', { recipe, chef })
      })
    })
  },
  edit (req, res) {
    Recipe.findByID(req.params.id, function (recipe) {
      Recipe.find(function(chefs) {
        return res.render('admin/recipes/edit', { recipe, chefs })
      })
    })
  },
  post (req, res) {
    Recipe.create(req.body, function (recipe) {
      return res.redirect('/admin')
    })
  },
  put (req, res) {
    Recipe.update(req.body, function () {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete (req, res) {
    Recipe.delete(req.params.id, function() {
      return res.redirect('/admin/recipes')
    })
  }
}
