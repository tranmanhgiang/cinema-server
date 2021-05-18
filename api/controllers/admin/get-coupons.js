module.exports = {
  friendlyName: "Get coupons",

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
      const coupons = await Coupons.find();
      if (!coupons.length) throw "error";
      return exits.success({
        data: coupons,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
