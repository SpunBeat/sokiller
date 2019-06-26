const users = require('./users.controller.js');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.route('/api/admin/users/register')
    .post(users.register);
  app.route('/api/admin/users/login')
    .post(users.login);
  app.route('/api/admin/users/')
    .get(users.list);
  app.route('/api/admin/check')
    .post(requireAuth, users.check);
  app.route('/api/admin/user/profile')
    .post(users.profile);
  app.route('/api/admin/user/updateSpecificData/:userId')
    .patch(users.updateSpecificData);
};
