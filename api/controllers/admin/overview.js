module.exports = {
  friendlyName: "Overview",

  description: "Overview admin.",

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
      const totalFilm = await Films.find();
      const totalTheater = await Rooms.find();
      const totalTicketOrder = await Orders.find();
      const totalMember = await Users.find();
      return exits.success({
        totalFilm: totalFilm.length,
        totalTheater: totalTheater.length,
        totalTicketOrder: totalTicketOrder.length,
        totalMember: totalMember.length,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
