/**
 * Popcorn.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    imageUrl: { type: "string", required: true},
    description: { type: "string", required: true},
    price: { type: "number", required: true },
    isDeleted: { type: 'number', defaultsTo: 0 }
  },
};
