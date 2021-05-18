module.exports = {
  friendlyName: "Get suggest films",

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
      const idsFilmSuggest = await sails.sendNativeQuery(
        "SELECT COUNT(filmId) AS total, filmId FROM `orders` GROUP BY filmId ORDER BY COUNT(filmId) DESC LIMIT 3"
      );
      const filmSuggest = await sails.sendNativeQuery(
        `SELECT * FROM films WHERE id IN (${idsFilmSuggest.rows[0].filmId}, ${idsFilmSuggest.rows[1].filmId}, ${idsFilmSuggest.rows[2].filmId})`
      );
      return exits.success({
        data: filmSuggest.rows,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
