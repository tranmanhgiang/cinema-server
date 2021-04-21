const bcrypt = require("bcryptjs");

module.exports = {


  friendlyName: 'Add user',


  description: '',


  inputs: {
    firstName: { type: "string", required: true },
    email: { type: "string", required: true },
    lastName: { type: "string", required: true },
    password: { type: "string", required: true },
    phone: {type: "number", required: true},
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
      const check_user_exits = await Users.findOne({email: inputs.email});
      if (check_user_exits) throw "user_exits";
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(inputs.password.toString(), salt);
      const createUser = await Users.create({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        password: hashPassword,
      }).fetch();
      if (!createUser) throw 'err';
      
      return exits.success({
        message: "true",
      });
    } catch (err) {
      switch (err) {
        case "user_exits":
          return exits.fail({
            message: "Email đã tồn tại",
          });
        default:
          return exits.fail({
            message: "false",
          });
      }
    }
  }


};
