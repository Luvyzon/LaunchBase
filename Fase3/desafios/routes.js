const express = require('express')
const routes = express.Router()
const teatchers = require("./teatchers.js")

routes.get('/', function(req, res){
    return res.redirect('/teatchers')
})
routes.get('/teatchers', function(req, res){

    return res.render('teatchers/index')
})
routes.get('/teatchers/create', function(req, res){
    return res.render("teatchers/create")
})
routes.post('/teatchers', teatchers.post)
routes.get('/teatchers/:id', teatchers.show)

routes.get('/students', function(req, res){


    return res.render('students')
})




module.exports =  routes