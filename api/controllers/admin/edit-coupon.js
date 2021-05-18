module.exports = {
  friendlyName: "Edit coupon",

  description: "",

  inputs: {
    id: { type: "number", required: true },
    name: { type: "string", required: true },
    couponCode: { type: "string", required: true },
    couponType: { type: "number", required: true },
    values: { type: "number", required: true },
    memberRole: { type: "number", required: true },
    filmId: { type: "number", required: true },
    startDate: { type: "string", required: true },
    endDate: { type: "string", required: true },
    imageUrl: { type: "string", required: true},
    description: { type: "string", required: true},
    isDeleted: { type: "string", required: true },
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
      const updatedCoupon = await Coupons.updateOne({ id: inputs.id }).set({
        name: inputs.name,
        couponCode: inputs.couponCode,
        couponType: inputs.couponType,
        values: inputs.values,
        memberRole: inputs.memberRole,
        filmId: inputs.filmId,
        startDate: inputs.startDate,
        endDate: inputs.endDate,
        imageUrl: inputs.imageUrl,
        description: inputs.description,
        isDeleted: inputs.isDeleted,
      });
      if (!updatedCoupon) throw "error";

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
