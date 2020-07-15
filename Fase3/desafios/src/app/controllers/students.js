const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const Intl = require("intl")
const Student = require('../models/student')
const teatcher = require("../models/teatcher.js")

module.exports = {
    index (req, res){
        
        Student.all(function(students){
            return res.render('students/index', {students})
        })
        
    },
    create (req, res){
        Student.teatchersSelectOptions(function(options){
            return res.render("students/create", {teatcherOptions: options})
        })

    },
    post (req, res){
        
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
           
            Student.teatchersSelectOptions(function(options){
                return res.render("students/edit", {student, teatcherOptions: options})
            })
        })
    },
    put (req, res){
        
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
