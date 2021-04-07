module.exports = {
  friendlyName: "Create room",

  description: "",

  inputs: {
    name: { type: "string", required: true },
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
    // All done.
    try {
      const createRoom = await Rooms.create({
        name: inputs.name,
      }).fetch();
      if (!createRoom) throw 'error';
      return exits.success({
        message: 'true'
      });
    } catch (error) {
      return exits.fail({
        message: 'false'
      })
    }
  },
};
