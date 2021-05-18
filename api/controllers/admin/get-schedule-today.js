var dayjs = require('dayjs');

module.exports = {
  friendlyName: "Get schedule today",

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
      const today = dayjs().hour(0).minute(0).second(0).format('YYYY-MM-DD');
      const schedule = await Schedule.find({ date: parseInt(dayjs(today).valueOf()) });
      return exits.success({
        data: schedule,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
