const fs = require("fs")
const data = require("../data.json")
const { age, degreeLevel, date } = require("../utils.js")
const Intl = require("intl")
//index
exports.index = function(req, res){
    
        
    
        return res.render('students/index', {students: data.students})
}
// create
exports.post = function(req,res){

    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fields")
        }
    }

    birth = Date.parse(req.body.birth)
   
    let id = -1
    const lastStudent = data.students[data.students.length - 1]
    if(lastStudent){
        id = lastStudent + 1
    }
    data.students.push({
        ...req.body,
        id,
        birth,

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
        return res.redirect("/students")
    })
}
//show
exports.show = function(req, res){
    const {id} = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        degree: degreeLevel(foundStudent.degree),
        birthDay: date(foundStudent.birth).birthDay
    }


    return res.render('students/show', {student})
}
// edit
exports.edit = function(req, res){
    const {id} = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
        
        
    }

    return res.render("students/edit", {student})
}
// put
exports.put = function(req, res){
    const {id} = req.body
    let index = 0
    
    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id){
            index = foundIndex
            return true
        }
    })
    
    if(!foundStudent) return res.send("Student not found!")

     const student ={
         ...foundStudent,
         ...req.body,
         birth: Date.parse(req.body.birth),
         id: Number(req.body.id)
     }
     data.students[index] = student

     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
         if(err) return res.send("Write file Error")
         return res.redirect(`/students/${id}`)
     })

    
}
//delete
exports.delete = function(req, res){
    const {id} = req.body
    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })
    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file Error")
        
    })
    return res.redirect('/students')

}