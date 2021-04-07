/**
 * Schedule.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    timeMilestones: { type: "string", required: true },
    timeEnd: { type: "string", required: true },
    date: { type: "string", required: true },
    filmId: { type: "string", required: true },
    roomId: { type: "string", required: true },
  },
};
