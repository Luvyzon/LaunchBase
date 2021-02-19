const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "85c9248105c411",
    pass: "f24ffcd35d7fe1"
  }
})
