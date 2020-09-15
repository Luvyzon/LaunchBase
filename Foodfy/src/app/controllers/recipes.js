const Recipe = require('../models/recipe')
module.exports = {
  index (req, res) {
    Recipe.all(function (recipes) {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  create (req, res) {
    return res.render('admin/recipes/create')
  },
  show (req, res) {
    const { id } = req.params
    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id
    })
    if (!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
      ...foundRecipe
    }
    return res.render('admin/recipes/show', { recipe })
  },
  edit (req, res) {
    const { id } = req.params
    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id
    })
    if (!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
      ...foundRecipe
    }
    return res.render('admin/recipes/edit', { recipe })
  },

  post (req, res) {
    const { image, ingredients, preparation, information, title, author } = req.body

    const id = Number(data.recipes.length + 1)

    data.recipes.push({
      id,
      title,
      author,
      image,
      ingredients,
      preparation,
      information
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error')
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
