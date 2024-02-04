const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env._MAIL_USER,
    pass: process.env._MAIL_PASS,
  },
  secure: true,
  tls : { rejectUnauthorized: false }
});

module.exports.send = (from, to, subject, text, html, file, cc) => new Promise((resolve, reject) => {
  if (!from) from = process.env._MAIL_USER;
  const mailData = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
    attachments: file || null,
    cc: cc || null
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      reject(error);
    } else {
      resolve(info);
    }
  });
});
