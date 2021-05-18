module.exports = {
  friendlyName: "Get comingsoon films",

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
      const filmComingsoon = await sails.sendNativeQuery(
        `SELECT * FROM films WHERE id NOT IN (SELECT filmId FROM orders)`
      );
      return exits.success({
        data: filmComingsoon.rows,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
