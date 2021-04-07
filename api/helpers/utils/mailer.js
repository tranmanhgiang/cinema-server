const nodeMailer = require("nodemailer");

module.exports = {
  friendlyName: "Mailer",

  description: "Mailer utils.",

  inputs: {
    to: { type: "string", required: true },
    subject: { type: "string", required: true },
    htmlContent: { type: "string", required: true  }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const adminEmail = "testcinema99@gmail.com";
    const adminPassword = "Cinem@123";
    const mailHost = 'smtp.gmail.com';
    const mailPort = 587;

    const transporter = nodeMailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false,
      auth: {
        user: adminEmail,
        pass: adminPassword
      }
    });

    const options = {
      from: '"TMG 👻" <foo@example.com>',
      to: inputs.to,
      subject: inputs.subject,
      text: inputs.htmlContent
    }

    transporter.sendMail(options, (error) => {
      if (error) {
          console.log(error.message);
      }
      return exits.success({
        message: "Message sent successfully!"
      });
    })
  },
};
