const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox", // Sandbox or live
  client_id:
    "AZjqPGp-CkSa8PF1lUaWumHy7VxFC3ZDe3C_Jl8dyZT66MQ1AkEQ9gVaRe4Zmk4CXkElsGSWeYJ9oGQl",
  client_secret:
    "EI3FQPpjMNMuFwwCO6hyVl17kMN-SD_4XAKyjVEezqdjacAHTtb7VZuNZedAsmZoi7ylbjifMuzfMLSv",
});
module.exports = {
  friendlyName: "Test",

  description: "Test cinema.",

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
      // const payer_id = inputs.payerID;
      // const payment = {};
      // payment.amount = inputs.amount;
      // const paymentID = inputs.paymentID;
      // await sails.helpers.services.PaypalService(
      //   paymentID,
      //   payer_id,
      //   payment,
      //   (err, result) => {
      //     if (err) throw "error";
      //     return exits.success({
      //       message: "true",
      //     });
      //   }
      // );
      var create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://return.url",
          cancel_url: "http://cancel.url",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "item",
                  sku: "item",
                  price: "1.00",
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: "1.00",
            },
            description: "This is the payment description.",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for(let i = 0; i < payment.links.length; i++) {
            if(payment.links[i].rel === 'approval_url') {
              return exits.success({
                response_url: payment.links[i].href,
                message: "true",
              });
            }
          }
        }
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
