const fs = require("fs")
const data = require("./data.json")
const { age, graduation, type_lesson, date } = require("./utils.js")
const Intl = require("intl")
// create
exports.post = function(req,res){

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
}
//show
exports.show = function(req, res){
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
}
// edit
exports.edit = function(req, res){
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
}