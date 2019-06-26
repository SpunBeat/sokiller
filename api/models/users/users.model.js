const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  profilePicture: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  generalData: {
    name: String,
    phone: String,
    email: String,
    password: String,
    passwordHint: String,
    access: {
      comercialName: String,
      establishmentPhone: String,
      email: String,
      password: String,
      passwordHint: String
    },
    address: {
      state: String,
      street: String,
      extNum: String,
      intNum: String,
      postalCode: String,
      colonia: String,
      alcaldia: String
    },
    inCharge: {
      name: String,
      phone: String
    },
    schedules: {
      days: [],
      start: String,
      end: String
    }
  },
  fiscalData: {
    businessName: String,
    rfc: String,
    fiscalAddress: String,
    email: String
  },
  bankData: {
    bankName: String,
    titularName: String,
    accountNumber: String,
    clabe: String
  }
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
