const Chef = require('../models/chef')

module.exports = {
  index (req, res) {
    Chef.all(function (chef) {
      return res.render('admin/chefs/index', { chef })
    })
  },
  create (req, res) {
    return res.render('admin/chefs/create')
  },
  show (req, res) {
    return res.render('admin/chefs/show')
  },
  edit (req, res) {
    return res.render('admin/chefs/edit')
  },
  // POST
  post (req, res) {
    return res.redirect('/admin/chefs')
  },
  put (req, res) {
    return res.redirect('/admin/chefs')
  },
  delete (req, res) {
    return res.redirect('/admin/chefs')
  }
}
