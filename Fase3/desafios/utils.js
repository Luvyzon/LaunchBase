module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        
        today.getDate()
        birthDate.getDate()

        if(month < 0 || month == 0 && today.getDate() - birthDate.getDate()){
            age = age - 1
        }
        return age
    },
    graduation: function(degree){
        let graduation_level = (degree)
        if(graduation_level == "emc"){
            graduation_level = "Ensino Medio Completo"
        }else if(graduation_level == "esc"){
            graduation_level = "Ensino Superior Completo"
        }else if(graduation_level == "master"){
            graduation_level = "Mestrado"
        }else if(graduation_level == "doctor"){
            graduation_level = "Doutorado"
        }
        
        return graduation_level
    },
    type_lesson: function(type){
        let lesson = (type)
        if(lesson == "p"){
            lesson = "Prescencial"
        }else{
            lesson = "Ensino À Distancia"
        }
        return lesson
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
         
        return `${year}-${month}-${day}`
    }

}