module.exports = {
  friendlyName: "Book ticket directly",

  description: "",

  inputs: {
    price: { type: "number", required: true },
    date: { type: "string", required: true },
    time: { type: "string", required: true },
    filmId: { type: "number", required: true },
    theaterId: { type: "number", required: true },
    seat: { type: "json", columnType: "array", required: true },
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
      const orders = await Orders.create({
        userId: 0,
        price: inputs.price,
        code: '0',
        date: inputs.date,
        time: inputs.time,
        filmId: inputs.filmId,
        theaterId: inputs.theaterId,
      }).fetch();
      var orderDetailData = [];
      for (var i = 0; i < inputs.seat.length; i++) {
        orderDetailData.push({
          orderId: orders.id,
          seat: inputs.seat[i],
        });
      }
      await OrderDetail.createEach(orderDetailData);
      return exits.success({
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
