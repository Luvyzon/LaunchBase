const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/admin.js')

// PAGE INTIAL
routes.get('/', function (_req, res) {
    return res.render('inicio', { items: recipes }) 
})
routes.get('/sobre', function (_req, res) {
    return res.render('sobre')
})
routes.get('/receitas', function (_req, res) {
    return res.render('receitas', { items: recipes })
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
    return res.render('recepts', { recipe })
})

// ADMIN
routes.get('/admin', function (req, res) { return res.redirect('/admin/recipes') })
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

module.exports = routes
