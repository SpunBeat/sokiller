const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');

exports.showpath = function (req, res) {
  res.json(req.file.cloudStoragePublicUrl);
};

exports.register = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      success: false,
      message: 'Falta email y usuario'
    });
  } else {
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'El email ya está registrado.'
        });
      }
      res.status(201).json({
        success: true,
        user: user
      });
    });
  }
};

exports.check = (req, res) => {
  res.status(200).json({
    status: true
  });
};

exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  })
    .exec(function (err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'El usuario no se encontró.'
        });
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign(user.toJSON(), "INeedAHero", {
              expiresIn: 10080
            });
            res.status(200).json({
              success: true,
              token: 'JWT ' + token,
              user: user
            });
          } else {
            res.status(401).json({
              success: false,
              message: 'Contraseña incorrecta.'
            });
          }
        });
      }
    })
};

exports.list = function (req, res) {
  User.find()
    .sort('-created')
    .exec(function (err, users) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(users);
      }
    });
};


// perfil
exports.perfil = function (req, res) {
  User.findOne({
    '_id': req.user._id
  }, function (err, perfil) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(perfil);
    }
  }).populate('creator', 'username profilePicture');
};

// update
exports.update = function (req, res) {
  let query = {
    '_id': req.user._id
  };
  User.findOneAndUpdate(query, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
    }
  }, function (err, userUpdated) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(userUpdated);
    }
  });
};
