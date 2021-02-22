const express = require('express')
const routes = express.Router()
const HomeController = require('../app/controllers/HomeController.js')


const users = require('./users')
const recipes = require('./recipes')
const chefs = require('./chefs')

routes.get('/admin', function(req, res){
  return res.redirect('/admin/recipes')
})
routes.use('/admin/users', users)
routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)

// PAGE INTIAL

routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)
routes.get('/recipes', HomeController.recipes)
routes.get('/recipe/:id', HomeController.RecipeShow)
routes.get('/chefs', HomeController.chefs)
routes.get('/chef/:id', HomeController.ChefShow)





module.exports = routes
