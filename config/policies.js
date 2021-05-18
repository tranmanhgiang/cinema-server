/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'user/get-profile' : 'bearer',
  'cinema/book-ticket': 'bearer',
  // 'cinema/check-seat-selected': 'bearer',
  'cinema/get-history-booked': 'bearer',
  'admin/get-users': 'bearer',
  'admin/edit-user': 'bearer',
  'admin/get-coupons': 'bearer',
  'admin/add-coupons': 'bearer',
  'admin/edit-coupon': 'bearer',
  'admin/get-popcorns': 'bearer',
  'admin/add-popcorn': 'bearer',
};
