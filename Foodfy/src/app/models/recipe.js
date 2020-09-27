const db = require('../../config/db.js')
const { date } = require('../../libs/utils')

module.exports = {
  all (callback) {
    db.query(`
  SELECT recipes.*
  FROM recipes
  ORDER BY recipes.id
  `, function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  },
  find (callback) {
    db.query(`
    SELECT *
    FROM chefs
    ORDER BY chefs.id
    `, function (err, results) {
      if(err) throw `Database error: ${err}`
      callback(results.rows)
    })
  },
  create (data, callback) {
    const keys = Object.keys(data)
    for (key of keys) {
      if (data[key] == '') {
        return res.send('Please, fill all fields')
      }
    }

    const query = `
    INSERT INTO recipes (
      chef_id,
      image_url,
      title,
      ingredients,
      preparation,
      information,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    const values = [
      data.author,
      data.image_url,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  }
}
