const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes.js')
const chefs = require('./app/controllers/chefs.js')
const site = require('./app/controllers/site.js')
const { Router } = require('express')

// PAGE INTIAL
routes.get('/', function (_req, res) {
  return res.redirect('/index')
})
routes.get('/index', site.index)
routes.get('/about', site.about)
routes.get('/recipes', site.recipes)
routes.get('/chefs', site.chefs)
routes.get('/recipes/:id', site.show)

// ADMIN RECIPES
routes.get('/admin', function (req, res) {
  return res.redirect('/admin/recipes')
})
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

// ADMIN CHEFS
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes
