const express = require('express')
const { Router } = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const recipes = require('./app/controllers/recipes.js')
const chefs = require('./app/controllers/chefs.js')
const site = require('./app/controllers/site.js')

// PAGE INTIAL
routes.get('/', function (_req, res) {
  return res.redirect('/index')
})
routes.get('/index', site.index)
routes.get('/about', site.about)
routes.get('/recipes', site.recipes)
routes.get('/recipe/:id', site.RecipeShow)
routes.get('/chefs', site.chefs)
routes.get('/chef/:id', site.ChefShow)


// ADMIN RECIPES
routes.get('/admin', function (req, res) {
  return res.redirect('/admin/recipes')
})
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', multer.array("photos", 5), recipes.post)
routes.put('/admin/recipes', multer.array("photos", 5), recipes.put)
routes.delete('/admin/recipes', recipes.delete)

// ADMIN CHEFS
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', multer.array("photos", 1), chefs.post)
routes.put('/admin/chefs', multer.array("photos", 1), chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes
