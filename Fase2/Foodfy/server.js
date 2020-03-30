const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', function (_req, res) {
  return res.render('inicio', { items: recipes })
})
server.get('/sobre', function (_req, res) {
  return res.render('sobre')
})
server.get('/receitas', function (_req, res) {
  return res.render('receitas', { items: recipes })
})
server.get('/recepts', function (req, res) {
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
/*
server.get('/recepts/:index', function (req, res) {
  const recipe = [recipes]// Array de receitas carregadas do data.js
  const recipeIndex = req.params.index

  console.log(recipes[recipeIndex])
  return res.render('recepts')
})
*/
server.listen(5000, function () {
  console.log('server is running!')
})
