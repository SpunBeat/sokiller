const setPropsFrom = config => {
  const { props, from, $set = { } } = config
  for (const i in props) {
    $set[props[i]] = from[props[i]]
  }
  return { $set } 
}

const getSchemaProps = schema => {
  const tree = []
  for (const i in schema.tree) {
    tree.push(i)
  }
  return tree.filter(i => i !== 'id' && i !== '_id' && i !== '__v' && i !== 'created')
}

module.exports = {
  setPropsFrom,
  getSchemaProps
}