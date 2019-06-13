const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { setPropsFrom, getSchemaProps } = require('./Utility')

const getMany = (config, ...funs) => async (req, res) => {
  try {
    // 1. prepare the config variables
    const { from, as = 'data', conditions = {} } = config
    // 2. reference to a mongoose model
    const ref = mongoose.model(from)
    // 3. start the query
    const query = ref.find(conditions)
    // 4. apply funs by mapping
    funs.map(fun => query[fun.op](fun.param))
    // 5. await to responds
    const data = await query.execAsync()
    // 6. response to server
    res.status(200).json({ [as]: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getOne = (config, ...funs) => async (req, res) => {
  try {
    // 1. prepare the config variables
    const { from, as = 'data', conditions = {} } = config
    // 2. reference to a mongoose model
    const ref = mongoose.model(from)
    // 3. start the query
    const query = ref.findOne(conditions)
    // 4. apply funs by mapping
    funs.map(fun => query[fun.op](fun.param))
    // 5. await to responds
    const data = await query.execAsync()
    // 6. response to server
    res.status(200).json({ [as]: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const createOne = config => async (req, res) => {
  try {
    // 1. prepare the config variables
    const { from, as = 'data' } = config
    // 2. reference to a mongoose model
    const ref = mongoose.model(from)
    // 3. instance the new item
    const instance = new ref(req.body)
    // 4. await to responds
    const data = await instance.saveAsync()
    // 5. response to server
    res.status(200).json({ [as]: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const updateOne = (config, ...funs) => async (req, res) => {
  try {
    // 1. prepare the config variables
    const { from, as = 'data', by = 'id', props } = config
    // 2. reference to a mongoose model
    const ref = mongoose.model(from)
    // 3. start the query
    const query = ref.findOneAndUpdate(
      // a. find by
      req.params[by],
      // b. set properties - ie. $set: { a: req.body.a, ... }
      setPropsFrom({ props, from: req.body }),
      // c. options
      { new: true }
    )
    // 4. apply funs by mapping
    funs.map(fun => query[fun.op](fun.param))
    // 5. await to responds
    const data = await query.execAsync()
    // 6. response to server
    res.status(200).json({ [as]: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const deleteOne = config => async (req, res) => {
  try {
    // 1. prepare the config variables
    const { from, as = 'data', by = 'id' } = config
    // 2. reference to a mongoose model
    const ref = mongoose.model(from)
    // 3. start the query
    const query = ref.findOneAndRemove(req.params[by])
    // 4. await to responds
    const data = await query.execAsync()
    // 5. response to server
    res.status(200).json({ [as]: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const registerOne = config => async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      success: false,
      message: 'Falta email y usuario'
    });
  } else {
    try {
      const { from, as = 'data' } = config
      const ref = mongoose.model(from)
      const instance = new ref(req.body)
      const data = await instance.saveAsync()
      res.status(201).json({ [as]: data, success: true })
    } catch (error) {
      return res.status(400).json({ error, success: false });
    }

  }
}

const loginOne = (config, ...funs) => async (req, res) => {
  try {
    const { from, conditions, as = 'data' } = config
    const ref = mongoose.model(from)
    const query = ref.findOne(conditions)
    funs.map(fun => query[fun.op](fun.param))
    const data = await query.execAsync()
    if (!data) {
      res.status(401).json({
        success: false,
        message: 'El usuario no se encontró.'
      })
    } else {
      data.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign(data.toJSON(), 'INeedAHero', {
            expiresIn: 10080
          });
          res.status(200).json({
            success: true,
            token: 'JWT ' + token,
            [as]: data
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Contraseña incorrecta.'
          });
        }
      });
    }

  } catch(error) {
    res.status(500).json({ error })
  }
}

const Entity = function (meta, schema, onAppInit) {

  const { from, by, plural, singular, registrable } = meta

  // 2. get many
  const getAllEntities = getMany(
    // a. config
    { from, as: plural },
  )

  // 3. create one
  const createOneEntity = createOne(
    // a. config
    { from, as: singular }
  )

  // 4. update one
  const updateOneEntity = updateOne(
    // a. config
    { from, as: singular, by, props: getSchemaProps(schema) },
  )

  // 5. delete one
  const deleteOneEntity = deleteOne(
    // a. config
    { from, as: singular, by }
  )

  const getOneEntity = getOne(
    { from, as: singular }
  )

  // a. init
  this.init = app => {
    mongoose.model(from, schema)
    if (onAppInit) {
      onAppInit(app)
    }
    // default routes
    app.route(`/api/${plural}`).post(createOneEntity).get(getAllEntities)
    app.route(`/api/${singular}/:${by}`).get(getOneEntity).patch(updateOneEntity).delete(deleteOneEntity)

    if (registrable) {
      const registerOneEntity = registerOne(
        { from, as: singular }
      )
      const loginOneEntity = loginOne(
        { from, as: singular }
      )
      app.route(`/api/${singular}/register`).post(registerOneEntity)
      app.route(`/api/${singular}/login`).post(loginOneEntity)

    }

    return this
  }
}

module.exports = {
  getMany,
  createOne,
  updateOne,
  deleteOne,
  getOne,
  Entity
}
