const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Login",

  description: "Login user.",

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
      const login_user = await Users.findOne({email: inputs.email});
      if (!login_user) throw "e_user_login_fail";
      const isMatch = await bcrypt.compareSync(inputs.password, login_user.password);
      if (!isMatch) throw "e_user_login_fail";
      const isBlock = login_user.isDeleted;
      if (isBlock) throw "e_block_user";
      let data = sails.helpers.jwt.generateToken.with({
        user: {
          id: login_user.id,
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
        message: "Username or password is incorrect",
      });
    }
  },
};
