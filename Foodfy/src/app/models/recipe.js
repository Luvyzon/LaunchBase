const db = require('../../config/db.js')
const { date } = require('../../libs/utils')
const fs = require('fs')

module.exports = {
  all (callback) {
    return db.query(`
    SELECT *
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    ORDER BY chefs.id
    `)
  },
  find (callback) {
    return db.query(`
    SELECT *
    FROM chefs
    ORDER BY chefs.id
    `)
  },
  findByID (id) {
    return db.query(`
    SELECT *
    FROM recipes
    WHERE recipes.id = $1
    `, [id])
  },
  findChefRecipe (id) {
    return db.query(`
    SELECT chefs.id, chefs.name, recipes.chef_id
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    WHERE recipes.id = $1
    ORDER BY chefs.id
    `, [id])
  },
  create (data, callback) {
    const query = `
    INSERT INTO recipes (
      chef_id,
      title,
      ingredients,
      preparation,
      information,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `
    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]
    return db.query(query, values)
  },
  update (data, callback) {
    const query = `
    UPDATE recipes SET
      chef_id=($1),
      title=($2),
      ingredients=($3),
      preparation=($4),
      information=($5)
      WHERE id = $6
    `
    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]
    return db.query(query, values)
  },
  async delete (id) {
    try {
      const results = await db.query(
        `
        SELECT files.*, recipe_id, file_id
        FROM files
        LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
        WHERE recipe_files.recipe_id = $1
          `, [id]
      )
      const files = results.rows
      
      await db.query(
        `
        DELETE FROM recipe_files
        WHERE recipe_id = $1
        `, [id])
      await db.query(
        `
        DELETE FROM recipes
        WHERE id = $1
        `, [id])

      files.map(async file => {
        fs.unlinkSync(`${file.path}`)
        await db.query(
        `
          DELETE FROM files
          WHERE id = $1
        `, [file.id])
      })

      return
    } catch (err) {
      console.error(err)

    }
  },
  files (id) {
    return db.query(`
    SELECT * 
    FROM recipe_files
    INNER JOIN files
    ON recipe_files.file_id = files.id
    WHERE recipe_id = $1`, [id])
  }
}
