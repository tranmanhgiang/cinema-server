module.exports = {


  friendlyName: 'Get orders list',


  description: '',


  inputs: {

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
      const ordersList = await sails.sendNativeQuery(`SELECT * FROM orders AS o JOIN users AS u ON o.userId = u.id JOIN rooms AS r ON o.theaterId = r.id JOIN films AS f ON o.filmId = f.id`);
      return exits.success({
        data: ordersList.rows,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  }


};
