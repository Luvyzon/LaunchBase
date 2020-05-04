const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const Intl = require("intl")
module.exports = {
    index (req, res){
        return res.render('teatchers/index')
    },
    post (req,res){
    
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        let {avatar_url, birth, name, gender, ed_level, type_lesson, area} = req.body
        
        birth = Date.parse(birth)
        const created_at = Date.now()
        const id = Number(data.teatchers.length + 1)
    
        data.teatchers.push({
            id,
            name,
            avatar_url,
            birth,
            gender,
            ed_level,
            type_lesson,
            area,
            created_at
        })
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file error")
            return res.redirect("/teatchers")
        })
    },
    show (req, res){
        const {id} = req.params
        const foundTeatcher = data.teatchers.find(function(teatcher){
            return teatcher.id == id
        })
        if(!foundTeatcher) return res.send("Teatcher not found!")
    
        const teatcher = {
            ...foundTeatcher,
            age: age(foundTeatcher.birth),
            ed_level: graduation(foundTeatcher.ed_level),
            area: foundTeatcher.area.split(","),
            type_lesson: type_lesson(foundTeatcher.type_lesson),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeatcher.created_at)
        }
    
    
        return res.render('teatchers/show', {teatcher})
    },
    edit (req, res){
        const {id} = req.params
        const foundTeatcher = data.teatchers.find(function(teatcher){
            return teatcher.id == id
        })
        if(!foundTeatcher) return res.send("Teatcher not found!")
    
        const teatcher = {
            ...foundTeatcher,
            birth: date(foundTeatcher.birth)
            
        }
    
        return res.render("teatchers/edit", {teatcher})
    },
    put (req, res){
        const {id} = req.body
        let index = 0
        
        const foundTeatcher = data.teatchers.find(function(teatcher, foundIndex){
            if(id == teatcher.id){
                index = foundIndex
                return true
            }
        })
        
        if(!foundTeatcher) return res.send("Teatcher not found!")
    
         const teatcher ={
             ...foundTeatcher,
             ...req.body,
             birth: Date.parse(req.body.birth)
         }
         data.teatchers[index] = teatcher
    
         fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
             if(err) return res.send("Write file Error")
             return res.redirect(`/teatchers/${id}`)
         })
    
        
    },
    delete (req, res){
        const {id} = req.body
        const filteredTeatchers = data.teatchers.filter(function(teatcher){
            return teatcher.id != id
        })
        data.teatchers = filteredTeatchers
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file Error")
            
        })
        return res.redirect('/teatchers')
    
    }
}

