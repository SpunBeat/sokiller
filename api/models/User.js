const { Entity } = require('../services/Entity')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const [ meta, schema ] = [
  {
    from: 'User',
    by: 'id',
    plural: 'users',
    singular: 'user',
    registrable: true
  },
  new Schema({
    created:   { type: Date, default: Date.now },
    active:    { type: Boolean, default: true },
    email:      { type: String, required: true },
    password:      { type: String, required: true },
  })
]

module.exports = new Entity(meta, schema)
