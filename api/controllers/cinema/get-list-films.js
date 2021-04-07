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
      const listFilm = await Films.find();
      if (!listFilm.length) throw "err";
      return exits.success({
        data: listFilm,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false"
      });
    }
  },
};
