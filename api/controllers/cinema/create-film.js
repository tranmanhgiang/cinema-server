var dayjs = require('dayjs');
module.exports = {
  friendlyName: "Create film",

  description: "",

  inputs: {
    filmName: { type: "string", required: true },
    imageUrl: { type: "string", required: true },
    description: { type: "string", required: true },
    author: { type: "string", required: true },
    actors: { type: "string", required: true },
    releaseDate: { type: "string", required: true },
    duration: { type: "string", required: true },
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
      const createFilm = await Films.create({
        filmName: inputs.filmName,
        imageUrl: inputs.imageUrl,
        description: inputs.description,
        author: inputs.author,
        actors: inputs.actors,
        releaseDate: dayjs(inputs.releaseDate).valueOf(),
        duration: inputs.duration * 3600000,
      }).fetch();
      if (!createFilm) throw "error";
      // const isResetSchedule = await sails.sendNativeQuery("DELETE FROM schedule");
      // if (!isResetSchedule) throw "error";
      // const handleSchedule = await sails.helpers.utils.handleSchedule();
      // if (!handleSchedule) throw "error";
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
