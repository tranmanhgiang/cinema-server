const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Signup",

  description: "Signup user.",

  inputs: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", require: true },
    phone: { type: "number", require: true },
    password: { type: "string", required: true },
    verifyCode: { type: "string", required: true },
    hash: { type: "string", required: true },
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
      const detectVerifyCode = await bcrypt.compareSync(
        inputs.verifyCode,
        inputs.hash
      );
      if (!detectVerifyCode) throw "e_invalid_code";

      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(inputs.password.toString(), salt);
      const createUser = await Users.create({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        password: hashPassword,
      }).fetch();
      if (!createUser) throw "e_create_user";

      return exits.success({
        message: "Create Successfully",
      });
    } catch (err) {
      switch (err) {
        case "e_invalid_code":
          return exits.fail({
            message: "Verify code invalid",
          });
        default:
          return exits.fail({
            message: "Create user fail"
          });
      }
    }
  },
};
