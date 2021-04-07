var dayjs = require("dayjs");
module.exports = {
  friendlyName: "Get cinema by film id",

  description: "",

  inputs: {
    date: { type: "string", required: true },
    filmId: { type: "number", required: true },
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
      const cinema = await sails.sendNativeQuery(
        `SELECT * FROM schedule WHERE filmId = ${inputs.filmId} AND date = ${dayjs(inputs.date).valueOf()}`
      );
      return exits.success({
        data: cinema.rows,
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
