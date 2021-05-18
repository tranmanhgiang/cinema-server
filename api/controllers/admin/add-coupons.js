module.exports = {


  friendlyName: 'Add coupons',


  description: '',


  inputs: {
    name: { type: "string", required: true },
    couponCode: { type: "string", required: true },
    couponType: { type: "number", required: true },
    values: { type: "number", required: true },
    memberRole: { type: "number", required: true},
    filmId: { type: "number", required: true},
    startDate: { type: "string", required: true},
    endDate: { type: "string", required: true},
    imageUrl: { type: "string", required: true},
    description: { type: "string", required: true},
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
      const check_coupons_exits = await Coupons.findOne({couponCode: inputs.couponCode});
      if (check_coupons_exits) throw "coupon_exits";
      const createCoupon = await Coupons.create({
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
      }).fetch();
      if (!createCoupon) throw 'err';
      
      return exits.success({
        message: "true",
      });
    } catch (err) {
      switch (err) {
        case "coupon_exits":
          return exits.fail({
            message: "Mã giảm giá đã tồn tại",
          });
        default:
          return exits.fail({
            message: "false",
          });
      }
    }
  }


};
