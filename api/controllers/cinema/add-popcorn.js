module.exports = {
  friendlyName: "Add popcorn",

  description: "",

  inputs: {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    imageUrl: { type: "string", required: true },
    price: { type: "number", required: true },
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
      const createPopcorn = await Popcorn.create({
        name: inputs.name,
        imageUrl: inputs.imageUrl,
        description: inputs.description,
        price: inputs.price,
      }).fetch();
      if (!createPopcorn) throw "err";

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
