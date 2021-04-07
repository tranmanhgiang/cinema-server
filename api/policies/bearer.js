// const moment = require('moment');
const _ = require('lodash');
module.exports = async (req, res, next) => {
  try {
    // if (process.env.LOYALTY_MODE !== 'admin' && process.env.LOYALTY_MODE !== 'both') throw 'Phiên làm việc hết hạn';
    let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
    if (!auth || auth.search('Bearer ') !== 0) {
      return res
        .status(401)
        .json(
          sails.helpers.common.responseError(
            new Error(Err.CODE.TOKEN_NOT_FOUND)
          )
        );
    }
    let token = auth.split(' ')[1];
    let userInfo = sails.helpers.jwt.verifyToken(token);
    req.user = userInfo;
    return next();
  } catch (err) {
    return res
      .status(401)
      .json(
        {
          code: 1,
          message: err
        }
      );
  }
};