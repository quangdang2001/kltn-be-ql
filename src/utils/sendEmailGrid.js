const nodemailer = require('nodemailer')
const sendEmail = async (formData) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  })
  var mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: formData.user,
    subject: formData.subject,
    html: formData.mail,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false
    } else {
      return true
    }
  })
}

module.exports = sendEmail
