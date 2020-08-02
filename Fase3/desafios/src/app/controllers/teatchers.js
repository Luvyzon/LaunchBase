const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const Intl = require("intl")
const Teatcher = require('../models/teatcher')

module.exports = {
    index (req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teatchers){
                const pagination = {
                    total: Math.ceil(teatchers[0].total / limit),
                    page
                }
                return res.render('teatchers/index', {teatchers, pagination, filter})
            }
        }
        Teatcher.paginate(params)
        
    },
    create (req, res){
       
            return res.render("teatchers/create")
    
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
            teatcher.created_at = date(teatcher.created_at).since
            teatcher.education_level = graduation(teatcher.education_level)
            teatcher.class_type = type_lesson(teatcher.class_type)
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

