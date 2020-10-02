const Recipe = require('../models/recipe.js')
const Site = require('../models/initial.js')

module.exports = {
  index (req, res) {
    return res.render('site/index.njk')
  },
  about (req, res) {
    return res.render('site/about.njk')
  },
  recipes (req, res) {
    let { filter } = req.query
    
    const params = {
      filter,
      callback (recipes) {
        return res.render('site/recipes.njk', { recipes, filter })
      }
    }
    Site.allRecipes(params)
  },
  chefs (req, res) {
    Site.allChefs(function (chefs) {
      return res.render('site/chefs.njk', { chefs })
    })
  },
  show (req, res) {
    Recipe.findByID(req.params.id, function (recipe) {
      recipe.ingredients.pop()
      recipe.preparation.pop()
      Recipe.findChefRecipe(req.params.id, function (chef) {
        return res.render('site/show.njk', { recipe, chef })
      })
    })
  }
}
