const Recipe = require('../models/recipe.js')
const File = require('../models/file')

module.exports = {
  async index (req, res) {
    let results = await Recipe.all()
    const recipes = results.rows

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }))
    return res.render('admin/recipes/index', { recipes, files })
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

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }))
  
    return res.render('admin/recipes/show', { recipe, chef, files })
  },
  async edit (req, res) {
    let results = await Recipe.findByID(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send('Recipe not found!')

    results = await Recipe.find()
    const chefs = results.rows

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }))

    return res.render('admin/recipes/edit', { recipe, chefs, files })
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
  async put (req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send('Please, fill all fields!')
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map( file => 
        File.create({...file, recipe_id: req.body.id}))

      await Promise.all(newFilesPromise)
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",")
      lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)
    }

    await Recipe.update(req.body)
    return res.redirect(`/admin/recipes/${req.body.id}`)
  },
  delete (req, res) {
    Recipe.delete(req.body.id)
    return res.redirect('/admin/recipes')
  }
}
