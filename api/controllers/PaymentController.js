module.exports = {
  friendlyName: "paypal checkout",

  description: "",

  inputs: {
    payerID: { type: "number", required: true },
    amount: { type: "number", required: true },
    paymentID: { type: "number", required: true },
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
      //   var execute_payment_json = {
      //     payer_id: inputs.payerID,
      //   };
      const payer_id = inputs.payerID;
      const payment = {};
      payment.amount = inputs.amount;
      const paymentID = inputs.paymentID;
      await sails.helpers.services.PaypalService(
        paymentID,
        payer_id,
        payment,
        (err, result) => {
          if (err) throw "error";
          return exits.success({
            message: "true",
          });
        }
      );

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
