const express = require('express')
const routes = express.Router()
const teatchers = require("./app/controllers/teatchers.js")
const students = require("./app/controllers/students.js")

routes.get('/', function(req, res){
    return res.redirect('/teatchers')
})

routes.get('/teatchers', teatchers.index)
routes.get('/teatchers/create', function(req, res){
    return res.render("teatchers/create")
})
routes.get('/teatchers/:id', teatchers.show)
routes.get('/teatchers/:id/edit', teatchers.edit)
routes.post('/teatchers', teatchers.post)
routes.put('/teatchers', teatchers.put)
routes.delete('/teatchers', teatchers.delete)


routes.get('/students', students.index)
routes.get('/students/create', function(req, res){
    return res.render("students/create")
})
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports =  routes