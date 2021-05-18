var dayjs = require('dayjs');

module.exports = {
  friendlyName: "Get schedule end date",

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
      const endDate = await Schedule.find({
        limit: 1,
        sort: "id DESC",
      });
      return exits.success({
        date: endDate[0] ? endDate[0].date : dayjs().valueOf(),
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
