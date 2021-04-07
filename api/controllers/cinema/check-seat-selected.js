var dayjs = require("dayjs");
module.exports = {
  friendlyName: "Check seat selected",

  description: "",

  inputs: {
    filmId: { type: "number", required: true },
    theaterId: { type: "number", required: true },
    date: { type: "string", required: true },
    time: { type: "string", required: true },
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
      const history = await sails.sendNativeQuery(
        `SELECT DISTINCT(od.seat) FROM orders AS o join orderdetail as od on o.id = od.orderId 
        where o.theaterId = ${inputs.theaterId} 
        and o.filmId = ${inputs.filmId} 
        and o.date = '${inputs.date}' 
        and o.time = '${inputs.time}'`
      );
      const seats = history.rows.map((item) => {
        return item.seat;
      });
      return exits.success({
        data: seats,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
