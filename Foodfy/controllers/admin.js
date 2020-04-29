const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
  return res.render('admin/index', { recipes: data.recipes })
}

exports.create = function (req, res) {
  return res.render('admin/create')
}
exports.show = function (req, res) {
  const {id} = req.params
  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id
  })
  if (!foundRecipe) return res.send('Recipe not found!')

  const recipe = {
    ...foundRecipe
  }
  return res.render('admin/show', { recipe })
}
exports.edit = function (req, res) {
  return res.render('admin/edit')
}
exports.post = function (req, res) {
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
}
