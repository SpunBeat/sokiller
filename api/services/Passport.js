const extJwt = require('passport-jwt').ExtractJwt;

module.exports = function () {
  const opts = {
    jwtFromRequest: extJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'INeedAHero'
  };
  require('./strategies/jwt')(opts);
};
