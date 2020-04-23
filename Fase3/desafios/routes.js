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
routes.get('/teatchers/:id', teatchers.show)
routes.get('/teatchers/:id/edit', teatchers.edit)
routes.post('/teatchers', teatchers.post)
routes.put('/teatchers', teatchers.put)
routes.delete('/teatchers', teatchers.delete)

routes.get('/students', function(req, res){


    return res.render('students')
})




module.exports =  routes