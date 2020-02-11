const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get("/", function(req, res){
   const about = {
       avatar_url:"foto perfil.jpg",
       name: "Matheus Luvison",
       role: "Estudante - Bootcamp",
       description: "Aprendendo a programar para entrar na carreira de programador e ser feliz na vida.",
       links: [
           {name: "GitHub", url:"http://www.github.com/Luvytek"},
           {name: "Linkedin", url:"https://www.linkedin.com/in/matheusluvison"},
           {name: "Facebook", url:"hhttps://www.facebook.com/MatheusALuvisonk"}
       ]
   }
   
   
    return res.render("about", {about})

})

server.get("/classes", function(req, res){
    return res.render("classes", {items: videos})

})
 
server.get("/video", function(req, res){
    const id = req.query.id;
    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }       
    })
    if(!video){
        return res.send("video not found")
    }
    return res.render("video", { item: video })
    
})

server.listen(5000, function(){
    console.log("server is running!")
})