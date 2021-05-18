module.exports = {
  friendlyName: "Get rooms",

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
      const listRooms = await Rooms.find();
      if (!listRooms.length) throw "err";
      return exits.success({
        data: listRooms,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false"
      });
    }
  },
};
