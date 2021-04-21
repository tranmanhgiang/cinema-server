module.exports = {
  friendlyName: "Get history booked",

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
      const user = this.req.user;
      // const history = await Orders.find({ userId: user.id });
      const sql = await sails.sendNativeQuery(`SELECT * FROM orders AS o JOIN films as f ON o.filmId = f.id JOIN rooms as r ON o.theaterId = r.id and o.userId <> 0`);

      // const orderID = await sails.sendNativeQuery(
      //   `SELECT DISTINCT(o.id) FROM orders AS o join orderdetail as od
      //   on o.id = od.orderId where o.userId = ${user.id}`
      // );
      // const orders = orderID.rows.map((item) => {
      //   return item.id;
      // });
      // const history = await sails.sendNativeQuery(
      //   `SELECT * FROM orders AS o join orderdetail as od
      //     on o.id = od.orderId where od.orderId in (${orders})`
      // );

      return exits.success({
        data: sql.rows,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
