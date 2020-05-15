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
            height
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.weight,
            data.height
        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`
          
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
        SELECT * 
        FROM members 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw "Database Error!"

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            birth=($3)
            email=($4),
            gender=($5),
            weight=($6),
            height=($7)
        WHERE id = $8
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.gender,
            data.weight,
            data.height,
            data.id
        ]
        db.query(query, values, function(err, results){
            if(err) throw "Database Error!"
          
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err){
            if(err) throw `Database error ${err}`
            return callback()
        })
    }
}