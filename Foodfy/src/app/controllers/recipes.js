const Recipe = require('../models/recipe.js')

module.exports = {
  index (req, res) {
    Recipe.all(function (recipes) {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  async create (req, res) {
    Recipe.find()
      .then(function (results) {
        const chefs = results.rows
        return res.render('admin/recipes/create', { chefs })
      })
  },
  async show (req, res) {
    let results = await Recipe.findByID(req.params.id)
    const recipe = results.rows[0]
    recipe.ingredients.pop()
    recipe.preparation.pop()

    results = await Recipe.findChefRecipe(req.params.id)
    const chef = results.rows[0]
    return res.render('admin/recipes/show', { recipe, chef })
  },
  async edit (req, res) {
    let results = await Recipe.findByID(req.params.id)
    const recipe = results.rows[0]
    results = await Recipe.find()
    const chefs = results.rows
    return res.render('admin/recipes/edit', { recipe, chefs })
  },
  async post (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    if (req.files.length == 0) {
      return res.send('Please, send at least one image')
    }

    if (req.body.author == "") {
      res.send('por favor selecione um chef')
    } else {
      let results = await Recipe.create(req.body)
      const recipeId = results.rows[0].id

      const filesPromise = req.files.map(file => File.create({ ...file, recipe_id: recipeId }))
      await Promise.all(filesPromise)

      return res.redirect('/admin')
    }
  },
  put (req, res) {
    Recipe.update(req.body, function () {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete (req, res) {
    Recipe.delete(req.body.id, function () {
      return res.redirect('/admin/recipes')
    })
  }
}
