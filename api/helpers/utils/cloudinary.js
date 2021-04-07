const cloudinary = require('cloudinary').v2;

module.exports = {

  friendlyName: 'Cloudinary',


  description: 'Cloudinary utils.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    cloudinary.config({
      cloud_name: 'tranmanhgiang',
      api_key: 393872865569941,
      api_secret: 'GhM3eUrDH4Z-wrmnwOM-la1J_gg',
  });
  }


};

