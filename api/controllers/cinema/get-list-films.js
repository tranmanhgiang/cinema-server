module.exports = {
  friendlyName: "Get list films",

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
      const listFilms = await sails.sendNativeQuery(
        `SELECT * FROM films WHERE id IN (SELECT filmId FROM schedule)`
      );
      return exits.success({
        data: listFilms.rows,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false"
      });
    }
  },
};
