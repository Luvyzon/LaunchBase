
const Intl = require('intl')
const { age, date } = require ('../../lib/utils.js')
const Instructor = require('../models/instructor')

module.exports = {
    index (req, res){
        const { filter } = req.query

            if(filter) {
                Instructor.findBy(filter, function(instructors){
                    return res.render('instructors/index', {instructors})
                })
            } else {

                Instructor.all(function(instructors) {
                    return res.render('instructors/index', {instructors})
            })
        }
    },
    create (req, res){
        
        return res.render('instructors/create')
    },
    show (req, res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send('Instructor Not Found!')
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format
            return res.render('instructors/show', {instructor})
        })
    },
    post (req, res){
        
       Instructor.create(req.body, function(instructor){

        return res.redirect(`/instructors/${instructor.id}`)
       })
       
    },
    edit (req, res){
        
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send('Instructor Not Found!')
            instructor.birth = date(instructor.birth).iso
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format
            return res.render('instructors/edit', {instructor})
        })
    },
    put (req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if( req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        Instructor.update(req.body, function(err){
            if(err) throw"Write file Error!"

            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete (req,res){
        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
    }
}
