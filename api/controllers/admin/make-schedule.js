module.exports = {
  friendlyName: "Make schedule",

  description: "",

  inputs: {
    date: { type: "string", required: true },
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
      const handleSchedule = await sails.helpers.utils.handleSchedule(inputs.date);
      if (!handleSchedule) throw "error";
      return exits.success({
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
