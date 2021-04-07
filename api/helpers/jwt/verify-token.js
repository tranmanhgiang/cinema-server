const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require('fs');

module.exports = {


  friendlyName: 'Verify token',


  description: 'Verify jwt.',


  inputs: {
    token: { type: 'string', description: 'Token cần kiểm tra', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,
  fn: function (inputs, exits) {
    let { token } = inputs;
    try {
      let decoded = jwt.verify(token, '2dc5de62-b68b-48d1-bfa2-c31c6b24d06c');
      return exits.success(decoded);
    } catch (err) {
      console.log('err_verify_token : ' + err)
      throw new Error("TOKEN_EXPIRED")
    }
  }
};
