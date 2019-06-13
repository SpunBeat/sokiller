const { Entity, getMany } = require('../services/Entity')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const [ meta, schema ] = [
  {
    from: 'OrderRef',
    by: 'id',
    plural: 'orders',
    singular: 'order',
    customPopulate: { op: 'populate', param: { path: 'productRef' } }
  },
  new Schema({
    created:    { type: Date, default: Date.now },
    productRef: { type: Schema.ObjectId, ref: 'ProductRef', required: true },
    payment:    { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['PENDING', 'PAYMENT_PROCESS', 'PAID_OUT'],
      default: 'PENDING'
    },
  })
]

module.exports = new Entity(meta, schema, app => {
  const { from, plural, customPopulate } = meta
  const getOrders = getMany(
    // a. config
    { from, as: plural },
    // b. ...funs
    customPopulate,
  )
  app.route(`/api/${plural}`)
    .get(getOrders)

  app.route(`/api/${plural}/pending`)
    .get(async (req, res) => {
      try {
        const Order = mongoose.model('OrderRef')
        const query = Order.find({ status: 'PENDING'}).populate({ path: 'productRef' })
        const orders = await query.execAsync()
        res.status(200).json({ orders })
      } catch (error) {
        res.status(500).json({ error })
      }
    })

  app.route(`/api/${plural}/paymentProcess`)
    .get(async (req, res) => {
      try {
        const Order = mongoose.model('OrderRef')
        const query = Order.find({ status: 'PAYMENT_PROCESS'}).populate({ path: 'productRef' })
        const orders = await query.execAsync()
        res.status(200).json({ orders })
      } catch (error) {
        res.status(500).json({ error })
      }
    })

  app.route(`/api/${plural}/paidOut`)
    .get(async (req, res) => {
      try {
        const Order = mongoose.model('OrderRef')
        const query = Order.find({ status: 'PAID_OUT'}).populate({ path: 'productRef' })
        const orders = await query.execAsync()
        res.status(200).json({ orders })
      } catch (error) {
        res.status(500).json({ error })
      }
    })
})
