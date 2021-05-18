/**
 * Orders.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    userId: { type: "number", required: true },
    price: { type: "number", required: true },
    code: { type: "string", required: true },
    date: { type: "string", required: true },
    time: { type: "string", required: true },
    filmId: { type: "number", required: true },
    theaterId: { type: "number", required: true },
    popcornId: { type: "string", required: true },
  },
};
