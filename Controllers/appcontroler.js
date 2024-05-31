const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mac71@ethereal.email",
      pass: "Adj7KWg3spx9jJQKPr",
    },
  });

  let message = {
    from: '"Jatin Mahawar" <jatinmahawar08@gamil.com>',
    to: "jatin.mahawar@gyws.org",
    subject: "Hello Ji",
    text: "TEsting",
    html: "<b> Hello JI</b>",
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "YOu shoudl receive mail" });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getbill = (req, res) => {
  const { RECIEVER_MAILS, MAIL_BODY, MAIL_SUBJECT, EMAIL, EMAIL_APP_PASSWORD } = req.body;
  const files = req.files;
  const receiveremails = JSON.parse(RECIEVER_MAILS);
  // console.log(receiveremails)
  // console.log(files); 
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_APP_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  // console.log(MAIL_BODY)
  let attachments = files.map((file) => ({
    filename: file.originalname,
    content: file.buffer,
  }));
 
  let emailPromises = receiveremails.map((receiveremail, i) => {
    return new Promise((resolve, reject) => {
      let message = {
        from: EMAIL,
        to: receiveremails[i],
        subject: MAIL_SUBJECT,
        html: `<div style="white-space: pre-wrap;">${MAIL_BODY}</div>`,
        attachments: attachments,
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(`Error occurred while sending email to ${receiveremail}: ${error.message}`);
          reject(error);
        } else {
          console.log(`Email sent to ${receiveremail}: ${info.response}`);
          resolve(info);
        }
      });
    });
  });
  
  Promise.all(emailPromises)
  .then(() => {
    return res.status(201).json({
      msg: "Check Mail",
    });
  })
  .catch((error) => {
    return res.status(404).json({
      msg: "Error Occured",
    });
  });
};

module.exports = {
  signup,
  getbill,
};
