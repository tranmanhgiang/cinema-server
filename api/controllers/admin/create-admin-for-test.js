const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Create admin for test",

  description: "",

  inputs: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", require: true },
    password: { type: "string", required: true },
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
      var hashPassword = bcrypt.hashSync(inputs.password.toString(), salt);
      const createAdmin = await Admin.create({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        password: hashPassword,
      }).fetch();
      if (!createAdmin) throw "e_create_user";

      return exits.success({
        message: "Create Successfully",
      });
    } catch (err) {
      return exits.fail({
        message: "Create user fail"
      });
    }
  },
};
