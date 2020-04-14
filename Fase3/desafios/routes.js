const express = require('express')
const routes = express.Router()
const teatchers = require("./teatchers.js")

routes.get('/', function(req, res){
    return res.redirect('/students')
})

routes.get('/students', function(req, res){


    return res.render('students')
})

routes.get('/teatchers', function(req, res){

    return res.render('teatchers')
})
routes.get('/teatchers/create', function(req, res){
    return res.render("create")
})
routes.post('/teatchers', teatchers.post)

module.exports =  routes