const nodemailer = require("nodemailer");

export default async function sendMail(req, res) {
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'milos@inkrist.net',
          pass: 'tomicsmrad1',
        },
      });
    
      let info = await transporter.sendMail({
        from: 'milos@inkrist.net',
        to: req.body.email, 
        subject: req.body.subject,
        html:req.body.html
      });
    
    res.json(info.messageId,nodemailer.getTestMessageUrl(info))
}