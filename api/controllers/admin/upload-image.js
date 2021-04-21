var admin = require("firebase-admin");
const uuid = require("uuid-v4");
const path = require("path");
var serviceAccount = require(path.join(
  __dirname,
  "../../../config-firebase/serviceAccount.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://project-1a362.appspot.com",
});
var bucket = admin.storage().bucket();

module.exports = {
  friendlyName: "Upload image",

  description: "",
  files: ["images"],
  type: "customer",
  inputs: {
    images : { type : 'ref', required : true }
  },

  exits: {
    success : { statusCode : 200 },
    fail : { statusCode : 400 },
  },

  fn: async function (inputs, exits) {
    try {
      let info = await sails.upload(inputs.images);
      let filename = info[0].fd
      let uuidv4 = uuid();
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4,
        },
        contentType: "image/png",
        cacheControl: "public, max-age=31536000",
      };
      let uploadInfo = await bucket.upload(filename, {
        gzip: true,
        metadata: metadata,
      });
      let images = `https://firebasestorage.googleapis.com/v0/b/project-1a362.appspot.com/o/${uploadInfo[1].name}?alt=media&token=${uuidv4}`
      return exits.success({
        code: 0,
        message: "Thành công",
        images
      });
    } catch (err) {
      return exits.fail({
        code: 1,
        message: err,
      });
    }
  },
};
