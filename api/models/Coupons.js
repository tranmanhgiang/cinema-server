/**
 * Coupons.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
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
    isDeleted: { type: 'number', defaultsTo: 0 }
  },

};

