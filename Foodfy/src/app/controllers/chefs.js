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
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}/${file.path}`
    }))

    return res.render('admin/chefs/edit', { chef, files })
  },
  // POST
  async post (req, res) {

    try {

      const filesPromise = req.files.map(file => File.createChef({
        name: file.filename,
        path: `public/images/${file.filename}`
      }))

      const fileId = await Promise.all(filesPromise)
      console.log(fileId)
      const values = {
        name: req.body.name,
        file_id: JSON.parse(fileId)
      }

      const chefId = await Chef.create(values)

      return res.redirect(`/admin/chefs/${chefId}`)
    } catch (err) {
      console.log(err)
    }
  },
  put (req, res) {
    Chef.update(req.body, function () {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete (req, res) {
    if (req.body.total >= 1) {
      res.send('Não é Possivel deletar este Chef porque ele possui receitas cadastradas!')
    } else {
      Chef.delete(req.body.id, function () {
        return res.redirect('/admin/chefs')
      })
    }
  }
}
