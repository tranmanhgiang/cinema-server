const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Generate token',


  description: 'Sign jwt.',


  inputs: {
    user: { type: 'ref', description: 'Thông tin người dùng', required: true },
    time: { type: 'number', description: 'Thời gian hết hạn. Đơn vị milliseconds' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs, exits) {
    let { user, time = 300000 } = inputs;
    user.createdTime = new Date().getTime();
    delete user.exp;
    delete user.iat;
    // console.log("Conf".get('JWT_SECRET','Dawd21415@$151dadwf525wfe'))
    let token = jwt.sign(user, "2dc5de62-b68b-48d1-bfa2-c31c6b24d06c", { expiresIn: time });
    exits.success(token);
  }
};

