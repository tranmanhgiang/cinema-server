const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Send email get verify code",

  description: "",

  inputs: {
    email: { type: "string", required: true },
  },

  exits: {
    success: {
      statusCode: 200,
    },
    fail: {
      statusCode: 400,
    },
  },

  fn: async function (inputs, exits) {
    try {
      const verifyCode = Math.floor(Math.random() * 899999 + 100000);
      var salt = bcrypt.genSaltSync(10);
      var hashVerifyCode = bcrypt.hashSync(verifyCode.toString(), salt);
      const user = await Users.find({ email: inputs.email });
      if (user.length) {
        throw "e_exist_user";
      }
      const isSendMail = await sails.helpers.utils.mailer(
        inputs.email,
        "VerifyCode Cinema",
        verifyCode
      );
      if (!isSendMail) throw "e_send_mail_fail";
      return exits.success({
        success: "true",
        message: "Message sent successfully!",
        hash: hashVerifyCode,
      });
    } catch (error) {
      switch (error) {
        case "e_send_mail_fail":
          return exits.fail({
            success: "false",
            message: "Send code fail",
          });

        default:
          return exits.fail({
            success: "false",
            message: "Email already exists",
          });
      }
    }
  },
};
