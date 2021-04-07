/**
 * Films.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    filmName: { type: "string", required: true },
    imageUrl: { type: "string", required: true },
    description: { type: "string", required: true },
    author: { type: "string", required: true },
    actors: { type: "string", required: true },
    releaseDate: { type: "string", required: true },
    duration: { type: "string", required: true },
  },
};
