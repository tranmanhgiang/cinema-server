/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  //  user
  "/": { view: "pages/homepage" },
  "/paymentSuccess": { view: "pages/paymentSuccess" } ,
  "POST /user/signup": { action: "user/signup" },
  "POST /user/login": { action: "user/login"},
  "POST /user/send-email-get-verify-code": { action: "user/send-email-get-verify-code" },
  "POST /user/send-email-forgot-password": { action: "user/send-email-forgot-password" },
  "POST /user/verify-code-forgot-password": { action: "user/verify-code-forgot-password" },
  "POST /user/forgot-password": { action: "user/forgot-password" },
  "GET /user/get-profile": {action: "user/get-profile"},

  // cinema functions
  "GET /cinema/get-list-films": { action: "cinema/get-list-films" },
  "POST /cinema/create-room": { action: "cinema/create-room" },
  "POST /cinema/create-film": { action: "cinema/create-film" },
  "POST /cinema/book-ticket": { action: "cinema/book-ticket" },
  "POST /cinema/get-cinema-by-film-id": { action: "cinema/get-cinema-by-film-id" },
  "POST /cinema/create-payment": { action: "cinema/create-payment" },
  "GET /cinema/get-history-booked": { action: "cinema/get-history-booked" },
  "POST /cinema/check-seat-selected": { action: "cinema/check-seat-selected" },

  // admin
  "GET /admin/get-total-revenue": { action: "admin/get-total-revenue" },
  "POST /admin/get-revenue-by-period": { action: "admin/get-revenue-by-period" },
  "POST /admin/make-schedule": { action: "admin/make-schedule" },
  "GET /admin/get-schedule-end-date": { action: "admin/get-schedule-end-date" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
