const Chef = require('../models/chef')
const File = require('../models/file')

module.exports = {
  async index (req, res) {
    try {
      const results = await Chef.all()
      const chefs = results.rows

      return res.render('admin/chefs/index', { chefs })
    } catch (err) {
      console.log(err)
    }
  },
  create (req, res) {
    return res.render('admin/chefs/create')
  },
  async show (req, res) {
    try {
      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]
      if (!chef) return res.send('Chef not found!')

      results = await Chef.findRecipesByChef(req.params.id)
      const recipes = results.rows

      return res.render('admin/chefs/show', { chef, recipes })
    } catch (err) {
      console.log(err)
    }
  },
  async edit (req, res) {
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]
    if (!chef) return res.send('Chef not found!')

    results = await Chef.files(chef.id)
    let file = results.rows
    file = {
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }

    return res.render('admin/chefs/edit', { chef, file })
  },
  // POST
  async post (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
    if (req.files.length == 0) {
      return res.send('Please, send at least one image')
    }
    try {
      const { filename, path } = req.files[0]
      const file = await File.createChef({ name: filename, path })
      const fileId = file.rows[0].id
     
      const name = req.body.name
      const chefId = await Chef.create({ name, fileId })

      res.redirect(`/admin/chefs/${chefId.rows[0].id}`)
    } catch (err) {
      console.log(err)
    }
  },
  async put (req, res) {
    try {
      const keys = Object.keys(req.body)
      for (key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
          return res.send('Please, fill all fields!')
        }
      }

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map( file => 
          File.create({
            ...file,
            chef_id: req.body.id }))

        await Promise.all(newFilesPromise)
      }

      Chef.update(req.body)

      await File.delete(req.body.file_id)

      return res.redirect(`/admin/chefs/${req.body.id}`)
    } catch (err) {
      console.log(err)
    }
  },
  async delete (req, res) {
    if (req.body.total >= 1) {
      res.send('Não é Possivel deletar este Chef porque ele possui receitas cadastradas!')
    } else {
      Chef.delete(req.body.id)
      return res.redirect('/admin/chefs')
    }
  }
}
