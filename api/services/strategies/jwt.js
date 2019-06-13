const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('mongoose').model('User');

module.exports = opts => {
  const jwtStrategy = new JwtStrategy(opts,
    (req, done) => {
      User.findById(req._id)
        .exec((err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
    }
  );
  passport.use(jwtStrategy);
};
