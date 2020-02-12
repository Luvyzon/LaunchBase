const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const recipes = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})
