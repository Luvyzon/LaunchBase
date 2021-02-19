const User = require('../models/User')

const { hash } = require('bcryptjs')
const crypto = require("crypto")
const mailer = require('../../lib/mailer')

module.exports = {
  loginForm(req, res) {
    return res.render("session/login")
  },
  login(req, res) {
    req.session.userId = req.user.id
    return res.redirect("/users")
  },
  logout(req, res) {
    req.session.destroy()
    return res.redirect("/")
  },
  forgotForm(req, res) {
    return res.render("session/forgot-password")
  },
  async forgot(req, res) {
    const user = req.user
    try {
      //token
      const token = crypto.randomBytes(20).toString("hex")

      //exipiração
      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires:now
      })

      // enviar email
      await mailer.sendMail({
        to: user.email,
        from:'no-reply@launchstore.com',
        html: `
        <h2>Perdeu a chave?</h2>
        <p>Clique no link a seguir para recuperar sua senha</p>
        <p>
          <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">Recuperar senha</a>
          
        </p>
        `
      })

      //avisar usuario
      return res.render("session/forgot-password", {
        success: "verifique seu email para resetar sua senha"
      })
    } catch (err) {
      console.error(err)
      res.render("session/forgot-password", {
        error: "erro inesperado!"
      })
    }
  },
  resetForm(req, res) {
    return res.render("session/password-reset", { token: req.query.token })
  },
  async reset(req, res) {
    const user = req.user
    const { password, token } = req.body

    try {
      // cria um novo hash de senha
      const newPassword = await hash(password, 8)
      //atualiza o usuario
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""

      })
      //avisa o usuario q ele tem uma nova senha

      return res.render("session/login", {
        user: req.body,
        success:"SENHA ATUALIZADA! faça seu login"
      })

    } catch (err) {
      console.error(err)
      res.render("session/password-reset", {
        user: req.body,
        token,
        error: "erro inesperado!"
      })
    }
  }
}