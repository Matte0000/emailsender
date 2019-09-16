const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", (req, res) => {
  if (res.status === "503") {
    return res.send("Server Down");
  }
  res.send("Server on.");
});

app.post("/sent", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    auth: {
      user: "apikey",
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: '"Portfolio Contact" <paganimatte@gmail.com>',
    to: "pagani220@gmail.com",
    subject: `Porfolio Contact from ${req.body.name}`,
    html: `<h1>Portfolio Contact</h1><p>Name: ${req.body.name}</p><p>Phone Number: ${req.body.number}</p><p>Email: ${req.body.email}</p><h2>Message</h2><p>${req.body.message}</p>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send("Try again.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Mail Sent.");
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
