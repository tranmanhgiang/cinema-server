module.exports = {
  friendlyName: "Get profile",

  description: "",

  inputs: {},

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
      const user = this.req.user;
      const userInfo = await Users.findOne({ id: user.id });
      const purchased = await Orders.sum('price').where({ userId: user.id });
      userInfo.purchased = purchased;
      return exits.success({
        data: userInfo,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
