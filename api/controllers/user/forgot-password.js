const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Forgot password",

  description: "",

  inputs: {
    email: { type: "string", required: true },
    newPassword: { type: "string", required: true },
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
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(inputs.newPassword.toString(), salt);
      const updatedUser = await Users.update({ email: inputs.email })
        .set({ password: hashPassword })
        .fetch();
      if (!updatedUser.length) throw "e_forgot_password";
      return exits.success({
        message: "Reset password successfully",
      });
    } catch (error) {
      return exits.fail({
        message: "Reset password fail"
      });
    }
  },
};
