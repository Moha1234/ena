var adminController = require('../admin-controller/admin');
module.exports = function (app) {
  app.route('/dashboard').get(adminController.dashboard);
  app.route('/admin').get(adminController.admin);
  app.route('/admin').post(adminController.check_admin_login);
  app.route('/log_out').get(adminController.log_out);
  app.route('/AdminList').get(adminController.list_admin);
}