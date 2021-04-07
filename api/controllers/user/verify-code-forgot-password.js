const bcrypt = require("bcryptjs");

module.exports = {

  friendlyName: 'Verify code forgot password',


  description: '',


  inputs: {
    verifyCode: { type: "string", required: true },
    hash: { type: "string", required: true }
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
      const detectVerifyCode = await bcrypt.compareSync(inputs.verifyCode, inputs.hash);
      if (!detectVerifyCode) throw "e_invalid_code";

      return exits.success({
        message: 'true'
      });
    } catch (err) {
      return exits.fail({
        message: 'false'
      });
    }
  }


};
