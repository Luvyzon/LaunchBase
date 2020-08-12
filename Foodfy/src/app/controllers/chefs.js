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
    return res.render('admin/chefs/show')
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
    Chef.update(req.body, function(err) {
      if (err) throw `Database error: ${err}`

      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete (req, res) {
    return res.redirect('/admin/chefs')
  }
}
