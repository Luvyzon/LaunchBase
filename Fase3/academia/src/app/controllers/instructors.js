const { age, date } = require ('../../lib/utils.js')
const Intl = require('intl')
const db = require('../../config/db.js')

module.exports = {
    index (req, res){


        return res.render('instructors/index')
    },
    //show
    show (req, res){
       
        
        return res.render('instructors/show', {instructor})
    },
    //create
    post (req, res){
        
        const keys = Object.keys(req.body)
        for(key of keys) {
            if( req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
    
        const query = `
        INSERT INTO instructors (
            name,
            avatar_url,
            gender,
            services,
            birth,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `
        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso,
        ]
        db.query(query, values, function(err, results){
            if (err) return res.send('Database write error')
          
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })
    },
    //edit
    edit (req, res){
        
        const instructor = {
            ...foundInstructor,
            birth: date(foundInstructor.birth)
        }
        
    
    
    
        return res.render('instructors/edit', {instructor})
    },
    // put
    put (req, res){
        const {id} = req.body
        let index = 0
    
        const foundInstructor = data.instructors.find(function(instructor, foundIndex){
            if(id == instructor.id){
                index = foundIndex
                return true
            }
        })
        if(!foundInstructor) return res.send("Instructors not found!")
    
        const instructor = {
            ...foundInstructor,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }
        data.instructors[index] = instructor
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file error")
            return res.redirect(`/instructors/${id}`)
        })
    },
    // delete
    delete (req,res){
        const {id} = req.body
        const filteredInstructors = data.instructors.filter(function(instructor){
            return instructor.id != id
        })
        data.instructors = filteredInstructors
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file Error!")
        })
        return res.redirect('/instructors')
    }
}
