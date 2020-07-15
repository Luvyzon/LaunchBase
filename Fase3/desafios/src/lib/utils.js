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
         
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            since: `${day}-${month}-${year}`
        }    
    },
    degreeLevel: function(degree){
        let degree_level = (degree)
        if(degree_level == "5"){
            degree_level = "5º Ano Ensino Fundamental"
        }else if(degree_level == "6"){
            degree_level = "6º Ano Ensino Fundamental"
        }else if(degree_level == "7"){
            degree_level = "7º Ano Ensino Fundamental"
        }else if(degree_level == "8"){
            degree_level = "8º Ano Ensino Fundamental"
        }else if(degree_level == "9"){
            degree_level = "9º Ano Ensino Fundamental"
        }else if(degree_level == "1"){
            degree_level = "1º Ano Ensino Medio"
        }else if(degree_level == "2"){
            degree_level = "2º Ano Ensino Medio"
        }else if(degree_level == "3"){
            degree_level = "3º Ano Ensino Medio"
        }
        
        return degree_level
    },

}