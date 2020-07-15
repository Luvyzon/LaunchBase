const db = require('../../config/db.js')
const { age, graduation, type_lesson, date } = require("../../lib/utils.js")

module.exports = {
    all(callback){
        db.query(`
        SELECT teatchers.*, count(students) AS total_students
        FROM teatchers
        LEFT JOIN students ON (students.teatcher_id = teatchers.id)
        GROUP BY teatchers.id
        ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Database error: ${err}`
            callback(results.rows)
        })
    },
    create(data, callback){
        const keys = Object.keys(data)
        for(key of keys){
            if(data[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        
        const query = `
        INSERT INTO teatchers (
            name,
            avatar_url,
            birth,
            gender,
            education_level,
            class_type,
            subjects_taught,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso

        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!: ${err}`
          
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT * 
        FROM teatchers 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error!${err}`

            callback(results.rows[0])
        }) 
    },
    findBy(filter, callback){
        db.query(`
        SELECT teatchers.*, count(students) AS total_students
        FROM teatchers
        LEFT JOIN students ON (students.teatcher_id = teatchers.id)
        WHERE teatchers.name ILIKE '%${filter}%'
        OR teatchers.subjects_taught ILIKE '%${filter}%'
        GROUP BY teatchers.id
        ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
        UPDATE teatchers SET
        name=($1),
        avatar_url=($2),
        birth=($3),
        gender=($4),
        education_level=($5),
        class_type=($6),
        subjects_taught=($7)
        WHERE id = ($8)
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!${err}`
          
            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM teatchers WHERE id = $1`, [id], function(err){
            if(err) throw `Database error ${err}`
            return callback()
        })
    }
}