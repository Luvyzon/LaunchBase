const Recipe = require('../models/recipe.js')

module.exports = {
  index (req, res) {
    Recipe.all(function (recipes) {
      return res.render('admin/recipes/index', { recipes })
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
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
      if (id == recipe.id) {
        index = foundIndex
        return true
      }
    })
    if (!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
      ...foundRecipe,
      ...req.body,
      id: Number(req.body.id)
    }
    data.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error')
      return res.redirect(`/admin/recipes/recipes/${id}`)
    })
  },
  delete (req, res) {
    const { id } = req.body
    const filteredRecipes = data.recipes.filter(function (recipe) {
      return recipe.id != id
    })
    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file Error!')
    })
    return res.redirect('/admin/recipes/recipes')
  }
}
