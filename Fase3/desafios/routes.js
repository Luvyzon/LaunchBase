const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res){
    return res.redirect('/students')
})

routes.get('/students', function(req, res){


    return res.render('students')
})

routes.get('/teatchers', function(req, res){

    return res.render('teatchers')
})

module.exports =  routes