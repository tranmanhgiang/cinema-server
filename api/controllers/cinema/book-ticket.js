module.exports = {
  friendlyName: "Book ticket",

  description: "",

  inputs: {
    price: { type: "number", required: true },
    code: { type: "string", required: true },
    date: { type: "string", required: true },
    time: { type: "string", required: true },
    filmId: { type: "number", required: true },
    theaterId: { type: "number", required: true },
    seat: { type: "json", columnType: "array", required: true },
    popcornId: { type: "string", required: true },
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
      const user = this.req.user;
      const orders = await Orders.create({
        userId: user.id,
        price: inputs.price,
        code: inputs.code,
        date: inputs.date,
        time: inputs.time,
        filmId: inputs.filmId,
        theaterId: inputs.theaterId,
        popcornId: inputs.popcornId,
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
