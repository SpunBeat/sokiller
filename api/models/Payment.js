const { Entity, getMany, getOne } = require('../services/Entity')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const [ meta, schema ] = [
  {
    from: 'PaymentRef',
    by: 'id',
    plural: 'payments',
    singular: 'payment',
    customPopulate: { op: 'populate', param: { path: 'relatedOrders', populate: { path: 'productRef' } } }
  },
  new Schema({
    created:       { type: Date, default: Date.now },
    relatedOrders: [ { type: Schema.ObjectId, ref: 'OrderRef' } ],
    paymentDate:   { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['PAYMENT_PROCESS', 'PAID_OUT'],
      default: 'PAYMENT_PROCESS'
    },
  })
]

module.exports = new Entity(meta, schema, app => {
  const { from, plural, customPopulate, singular, by } = meta
  const getPayments = getMany(
    // a. config
    { from, as: plural },
    // b. ...funs
    customPopulate,
  )
  const getPayment = getOne(
    { from, as: singular },
    customPopulate
  )

  app.route(`/api/${singular}/:${by}`)
    .get(getPayment)
    .patch(async (req, res) => {
      try {
        const Payment = mongoose.model('PaymentRef')
        const Order = mongoose.model('OrderRef')
        const query = Payment.findByIdAndUpdate(req.params.id, { $set: { status: 'PAID_OUT' } })
        const payment = await query.execAsync()
        const updateRelatedOrderPromises = payment.relatedOrders.map(async order => {
          const query = Order.findByIdAndUpdate(
            order,
            {
              $set: { status: 'PAID_OUT' }
            },
            { new: true }
          )
          return await query.execAsync()
        });
        const data = await Promise.all(updateRelatedOrderPromises)
        res.status(200).json({ data, payment })
      } catch (error) {
        console.log(error);
        res.status(500).json({ error })
      }
    })

  app.route(`/api/${plural}`)
    .get(getPayments)
    .post(async (req, res) => {
      try {
        const Order = mongoose.model('OrderRef')
        // it creates a new array of promises
        const updateRelatedOrderPromises = req.body.relatedOrders.map(async order => {
          const query = Order.findByIdAndUpdate(
            order,
            {
              $set: { status: 'PAYMENT_PROCESS' }
            },
            { new: true }
          )
          return await query.execAsync()
        });
        // await until update all the orders
        const data = await Promise.all(updateRelatedOrderPromises)
        const Payment = mongoose.model('PaymentRef')
        const { addDays } = require('date-fns')
        const today = new Date()
        const instance = new Payment({
          relatedOrders: req.body.relatedOrders,
          paymentDate: addDays(today, 15)
        });
        // 4. await to responds
        const payment = await instance.saveAsync()
        // 5. response to server
        res.status(200).json({ data, payment })
      } catch(error){
        console.log(error);
        res.status(500).json({ error })
      }
    })

  app.route(`/api/${plural}/paymentProcess`)
    .get(async (req, res) => {
      try {
        const Payment = mongoose.model('PaymentRef')
        const query = Payment.find({ status: 'PAYMENT_PROCESS'})
        const payments = await query.execAsync()
        res.status(200).json({ payments })
      } catch (error) {
        res.status(500).json({ error })
      }
    })

  app.route(`/api/${plural}/paidOut`)
    .get(async (req, res) => {
      try {
        const Payment = mongoose.model('PaymentRef')
        const query = Payment.find({ status: 'PAID_OUT'})
        const payments = await query.execAsync()
        res.status(200).json({ payments })
      } catch (error) {
        res.status(500).json({ error })
      }
    })
})
