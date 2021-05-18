const bcrypt = require("bcryptjs");
module.exports = {
  friendlyName: "Login",

  description: "Login admin.",

  inputs: {
    email: { type: "string", required: true },
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
      const login_admin = await Admin.findOne({email: inputs.email});
      if (!login_admin) throw "e_admin_login_fail";
      const isMatch = bcrypt.compareSync(inputs.password, login_admin.password);
      if (!isMatch) throw "e_admin_login_fail";
      const isBlock = login_admin.isDeleted;
      if (isBlock) throw "e_block_admin";
      let data = sails.helpers.jwt.generateToken.with({
        user: {
          id: login_admin.id,
          email: inputs.email,
        },
      });
      delete inputs.password;
      if (!data) throw "err";
      return exits.success({
        Token: data,
      });
    } catch (error) {
      return exits.fail({
        message: "Email hoặc mật khẩu không đúng",
      });
    }
  },
};
