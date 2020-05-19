const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const Intl = require("intl")
const Teatcher = require('../models/teatcher')

module.exports = {
    index (req, res){
        Teatcher.all(function(teatchers){
            return res.render('teatchers/index', {teatchers})
        })
        
    },
    post (req,res){
        
        Teatcher.create(req.body, function(teatcher){
            return res.redirect(`/teatchers/${teatcher.id}`)
        })
       
    },
    show (req, res){
        Teatcher.find(req.params.id, function(teatcher){
            if(!teatcher) return res.send('Teatcher Not Found!')
            teatcher.age = age(teatcher.birth)
            teatcher.subjects_taught = teatcher.subjects_taught.split(',')
            teatcher.created_at = date(teatcher.created_at).format
            return res.render('teatchers/show', {teatcher})
        })
        
    },
    edit (req, res){
        Teatcher.find(req.params.id, function(teatcher){
            if(!teatcher) return res.send('Teatcher Not Found!')
            teatcher.birth = date(teatcher.birth).iso
            teatcher.subjects_taught = teatcher.subjects_taught.split(',')
            teatcher.created_at = date(teatcher.created_at).format
            return res.render('teatchers/edit', {teatcher})
        })
    },
    put (req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if( req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        Teatcher.update(req.body, function(err){
            if(err) throw"Write file Error!"

            return res.redirect(`/teatchers/${req.body.id}`)
        })
    
        
    },
    delete (req, res){
        Teatcher.delete(req.body.id, function(){
            return res.redirect(`/teatchers`)
        })
    
    }
}

