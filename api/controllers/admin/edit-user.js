module.exports = {
  friendlyName: "Edit user",

  description: "",

  inputs: {
    id: { type: "number", required: true },
    firstName: { type: "string", required: true },
    email: { type: "string", required: true },
    lastName: { type: "string", required: true },
    phone: { type: "number", required: true },
    isDeleted: { type: "number", required: true },
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
      const updatedUser = await Users.updateOne({ id: inputs.id }).set({
        firstName: inputs.firstName,
        email: inputs.email,
        lastName: inputs.lastName,
        phone: inputs.phone,
        isDeleted: inputs.isDeleted,
      });
      if (!updatedUser) throw "error";
      
      return exits.success({
        message: 'true',
      });
    } catch (error) {
      return exits.fail({
        message: "false",
      });
    }
  },
};
