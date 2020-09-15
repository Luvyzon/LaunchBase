const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes.js')
const chefs = require('./app/controllers/chefs.js')
const { Router } = require('express')

// PAGE INTIAL
routes.get('/', function (_req, res) {
  return res.render('site/inicio', { items: recipes })
})
routes.get('/sobre', function (_req, res) {
  return res.render('site/sobre')
})
routes.get('/receitas', function (_req, res) {
  return res.render('site/receitas', { items: recipes })
})
routes.get('/recepts', function (req, res) {
  const id = req.query.id
  const recipe = recipes.find(function (recipe) {
    if (recipe.id == id) {
      return true
    }
  })
  if (!recipe) {
    return res.send('Receita não encontrada')
  }
  return res.render('site/recepts', { recipe })
})

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
