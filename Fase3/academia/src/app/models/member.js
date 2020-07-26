const db = require('../../config/db.js')
const { age, date } = require ('../../lib/utils.js')
module.exports = {
    all(callback) {
        db.query('SELECT * FROM members', function(err, results){
            if(err) throw "Database Error!"

            callback(results.rows)
        })
       
    },
    create(data, callback) {
        const keys = Object.keys(data)
        for(key of keys) {
            if( data[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
    
        const query = `
        INSERT INTO members (
            name,
            avatar_url,
            email,
            gender,
            birth,
            weight,
            height,
            instructor_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.weight,
            data.height,
            data.instructor
        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`
          
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
        SELECT members.*, instructors.name AS instructor_name
        FROM members 
        LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            email=($4),
            gender=($5),
            weight=($6),
            height=($7),
            instructor_id=($8)
        WHERE id = $9
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.gender,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]
        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
          
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err){
            if(err) throw `Database error ${err}`
            return callback()
        })
    },
    instructorsSelectOptions(callback){
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if(err) throw  `Database Error! ${err}`
            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params
        
        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM members
            ) AS total`

        if ( filter ) {
            filterQuery = `${query}
            WHERE members.name ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT members.*, ${totalQuery}
        FROM members
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Error: ${err}`
            
            callback(results.rows)
        })
    }
}