const dayjs = require("dayjs");
var querystring = require("qs");
var sha256 = require("sha256");

module.exports = {
  friendlyName: "Create payment url",

  description: "",

  inputs: {
    amount: { type: "string", required: true },
  },

  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 },
  },

  fn: async function (inputs, exits) {
    try {
      var ipAddr = "[::1]:1337";

      var tmnCode = "GHSP82O7";
      var secretKey = "RSEUXLZWBHDARQUQNRKNIMILYCDZNGSU";
      var vnpUrl = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      var returnUrl = "http://192.168.0.104:1337/paymentSuccess";

      var createDate = dayjs().format("YYYYMMDDHHmmss");
      var orderId = dayjs().format("HHmmss");
      var amount = inputs.amount;
      var bankCode = "";

      var orderInfo = "Thanh toan don hang thoi gian: 2021-03-07 16:03:08";
      var orderType = "topup";
      var locale = "vn";
      var currCode = "VND";

      var vnp_Params = {};
      vnp_Params["vnp_Version"] = "2";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = orderInfo;
      vnp_Params["vnp_OrderType"] = orderType;
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

      var secureHash = sha256(signData);

      vnp_Params["vnp_SecureHashType"] = "SHA256";
      vnp_Params["vnp_SecureHash"] = secureHash;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

      //Neu muon dung Redirect thi dong dong ben duoi
      return exits.success({
        code: 00,
        data: vnpUrl,
      });
      // res.status(200).json({ code: "00", data: vnpUrl });
      //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
      //res.redirect(vnpUrl)""
    } catch (err) {
      return exits.fail({
        code: 1,
        message: err,
      });
    }
  },
};

function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}
