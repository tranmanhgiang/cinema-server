module.exports = {
  friendlyName: "Get total revenue",

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
      const total = await Orders.sum("price");
      return exits.success({
        totalRevenue: total,
        message: "true",
      });
    } catch (error) {
      console.log(error);
      return exits.fail({
        message: "false",
      });
    }
  },
};
