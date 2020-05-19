const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const Intl = require("intl")
const Student = require('../models/student')

module.exports = {
    index (req, res){
        Student.all(function(students){
            return res.render('students/index', {students})
        })
        
    },
    post (req,res){
        
        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
       
    },
    show (req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student Not Found!')
            student.birth = date(student.birth).birthDay
           
            return res.render('students/show', {student})
        })
        
    },
    edit (req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student Not Found!')
            student.birth = date(student.birth).iso
           
            return res.render('students/edit', {student})
        })
    },
    put (req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if( req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        Student.update(req.body, function(err){
            if(err) throw `Write file Error! ${err}`

            return res.redirect(`/students/${req.body.id}`)
        })
    
        
    },
    delete (req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    
    }
}
