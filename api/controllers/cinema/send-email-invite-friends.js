module.exports = {
  friendlyName: "Send email invite friends",

  description: "",

  inputs: {
    email: { type: "string", required: true },
    content: { type: "string", required: true },
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
      const analysisEmail = inputs.email.trim().split(" ");
      analysisEmail.forEach(async (email) => {
        await sails.helpers.utils.mailer(
          email,
          "invite friends",
          inputs.content
        );
      });
      return exits.success({
        success: "true",
        message: "Message sent successfully!",
      });
    } catch (error) {
      return exits.fail({
        success: "false",
        message: "Send email fail",
      });
    }
  },
};
