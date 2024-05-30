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
  const { usermail, mailbody, mailsubject,email, emailpassword} = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: email,
      pass: emailpassword,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let all_mail_send = true;
  // console.log(mailbody)
  for (let i = 0; i < usermail.length; i++) {
    let message = {
      from: email,
      to: usermail[i],
      subject: mailsubject,
      html: `<div style="white-space: pre-wrap;">${mailbody}</div>`,
     
    };
    transporter
      .sendMail(message)
      .then(() => {
        console.log(i + 1, "mail sent");
      })
      .catch((error) => {
        console.log("Error sending mail:", error);
        all_mail_send = false;
      });
  }
  if (all_mail_send === true) {
    return res.status(201).json({
      msg: "Check Mail",
    });
  } else {
    return res.status(404).json({
      msg: "Error Occured",
    });
  }
};

module.exports = {
  signup,
  getbill,
};
