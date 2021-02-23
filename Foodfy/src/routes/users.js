const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const ProfileController = require('../app/controllers/ProfileController')
const UserController = require('../app/controllers/UserController')

// LOGIN / LOGOUT

//routes.get('/login', SessionController.loginForm)
//routes.post('/login', SessionController.login)
//routes.post('/logout', SessionController.logout)

//reset password

//routes.get('/forgot-password', SessionController.forgotForm)
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/forgot-password', SessionController.forgot)
//routes.post('/password-reset', SessionController.reset)

// Rotas de perfil de um usuário logado

//routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários

routes.get('/register', UserController.registerForm)
//routes.get('/', UserController.list) //Mostrar a lista de usuários cadastrados
//routes.post('/', UserController.post) //Cadastrar um usuário
//routes.put('/', UserController.put) // Editar um usuário
//routes.delete('/', UserController.delete) // Deletar um usuário

module.exports = routes