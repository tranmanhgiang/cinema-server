module.exports = {


  friendlyName: 'Get users',


  description: '',


  inputs: {

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
      const users = await Users.find();
      if (!users.length) throw "error";
      return exits.success({
        data: users,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false"
      });
    }
  }


};
