const Chef = require('../models/chef')

module.exports = {
  index (req, res) {
    Chef.all(function (chefs) {
      return res.render('admin/chefs/index', { chefs })
    })
  },
  create (req, res) {
    return res.render('admin/chefs/create')
  },
  show (req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) return res.send('Chef not found!')
      Chef.findRecipesByChef(req.params.id, function (recipes) {
        return res.render('admin/chefs/show', { chef, recipes })
      })
    })
  },
  edit (req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) return res.send('Chef not found!')
      return res.render('admin/chefs/edit', { chef })
    })
  },
  // POST
  post (req, res) {
    Chef.create(req.body, function (chef) {
      return res.redirect('/admin/chefs')
    })
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
