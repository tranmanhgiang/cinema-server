var dayjs = require("dayjs");
module.exports = {
  friendlyName: "Get revenue by period",

  description: "",

  inputs: {
    period: { type: "string", required: true },
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
      const startDate = dayjs(inputs.period).startOf('month').valueOf();
      const endDate = dayjs(inputs.period).endOf('month').valueOf();
      const revenue = await sails.sendNativeQuery(`SELECT SUM(price) AS totalRevenue FROM orders WHERE date >= ${startDate} AND date <= ${endDate}`);
      return exits.success({
        totalRevenue: revenue.rows[0].totalRevenue,
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
