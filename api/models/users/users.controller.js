const User = require('mongoose').model('User')
const jwt = require('jsonwebtoken')

exports.showpath = (req, res) => {
  res.json(req.file.cloudStoragePublicUrl)
}

/**
 * Create a new user via [POST]
 */
exports.register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      success: false,
      message: 'Falta email y usuario'
    })
  } else {
    const newUser = new User(req.body)
    newUser.save((error, user) => {
      if (error) {
        res.status(400).json({
          success: false,
          message: 'El email ya está registrado.'
        })
      } else {
        res.status(200).json({ success: true, user: user })
      }
    })
  }
}

/**
 * This method could be executed after a require Authorization
 */
exports.check = (req, res) => {
  res.status(200).json({ status: true })
}

/**
 * Login a User via [POST]
 */
exports.login = (req, res) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(400).json({ success: false, message: 'Ocurrió un problema' })
    } else {
      if (!user) {
        res.status(400).json({ success: false, message: 'El usuario no se encontró.' })
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            const token = jwt.sign(user.toJSON(), 'INeedAHero', { expiresIn: 10080 })
            res.status(200).json({ success: true, token: `JWT ${token}`, user: user })
          } else {
            res.status(400).json({ success: false, message: 'Contraseña incorrecta.' })
          }
        })
      }
    }
  })
}

/**
 * This method gets a list of the users via [GET]
 */
exports.list = (req, res) => {
  User.find()
    .sort('-created')
    .exec((err, users) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).json(users)
      }
    })
}

/**
 * This method gets the profile of one user via [GET]
 */
exports.profile = (req, res) => {
  User.findById(req.body.userId, (error, user) => {
    if (error) {
      res.status(400).json({ error })
    } else {
      res.status(200).json({ user })
    }
  })
}

/**
 * This method updates the common data of one user via [PATCH]
 */
exports.update = (req, res) => {
  let query = {
    _id: req.user._id
  }
  User.findOneAndUpdate(
    query,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        profilePicture: req.body.profilePicture
      }
    },
    (err, userUpdated) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).json(userUpdated)
      }
    }
  )
}

/**
 * This method updates the specified data of one user via [PATCH]
 */

exports.updateSpecificData = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        generalData: req.body.generalData,
        fiscalData: req.body.fiscalData,
        bankData: req.body.bankData,
        profileData: req.body.profileData
      }
    },
    { new: true },
    (error, user) => {
      if (error) {
        res.status(400).json({ error })
      } else {
        res.status(200).json({ user })
      }
    }
  )
}
