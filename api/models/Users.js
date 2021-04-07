/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true },
    phone: { type: "number", required: true },
    password: { type: "string", required: true },
    isDeleted: { type: 'number', defaultsTo: 0 }
  },
};
