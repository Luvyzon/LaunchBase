const db = require('../../config/db.js')
const { age, graduation, type_lesson, date } = require("../../lib/utils.js")
const teatcher = require('./teatcher.js')

module.exports = {
    all(callback){
        db.query('SELECT * FROM students', function(err, results){
            if(err) throw `Database error: ${err}`
            callback(results.rows)
        })
    },
    create(data, callback){        
        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            birth,
            gender,
            email,
            degree,
            hours,
            teatcher_id
            
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.degree,
            data.hours,
            data.teatcher
            

        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!: ${err}`
          
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT * 
        FROM students 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error!${err}`

            callback(results.rows[0])
        }) 
    },
    update(data, callback){
        const query = `
        UPDATE students SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            gender=($4),
            email=($5),
            degree=($6),
            hours=($7),
            teatcher_id=($8)
        WHERE id = $9
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.degree,
            data.hours,
            data.teatcher,
            data.id
            
        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!${err}`
          
            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err){
            if(err) throw `Database error ${err}`
            return callback()
        })
    },
    teatchersSelectOptions(callback){
        db.query(`SELECT name, id FROM teatchers`, function(err, results){
            if(err) throw  `Database Error! ${err}`
            callback(results.rows)
        })
    }
}