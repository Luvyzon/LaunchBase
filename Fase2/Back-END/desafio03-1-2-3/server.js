const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const cursos = require("./data")

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})
server.get("/", function(req, res){

    return res.render("conteudo")
})
server.get("/sobre", function(req, res){
    return res.render("sobre")
})
server.get("/conteudo", function(req, res){
    return res.render("conteudo", {items: cursos})
})
server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function(){
    console.log("server is running!")
})