module.exports = {
  friendlyName: "Get popcorns",

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
      const popcorns = await Popcorn.find();
      if (!popcorns.length) throw "error";
      return exits.success({
        data: popcorns,
        message: "true",
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
