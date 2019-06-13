const { Entity } = require('../services/Entity')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const [ meta, schema ] = [
  {
    from: 'ProductRef',
    by: 'id',
    plural: 'products',
    singular: 'product',
  },
  new Schema({
    created:    { type: Date, default: Date.now },
    active:     { type: Boolean, default: true },
    id:         { type: String, required: true },
    name:       { type: String, required: true },
    type:       { type: Number },
    images:     { type: Schema.Types.Mixed },
    earning:    { type: Number },
    iva:        { type: Number },
    printPrice: { type: Number },
    total:      { type: Number }

  })
]

module.exports = new Entity(meta, schema)
