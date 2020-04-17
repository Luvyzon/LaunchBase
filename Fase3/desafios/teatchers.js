const fs = require("fs")
const data = require("./data.json")
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

    return res.render('teatchers/show', {teatcher: foundTeatcher})
}