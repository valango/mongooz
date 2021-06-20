//  lib/saveOne.js
'use strict'

/**
 * Update a record or insert a new one.
 * @param {Model} model
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const saveOne = (model, data) => {
  const { _id } = data

  return _id
    ? (model.updateOne({ _id }, data).then(() => data))
    : model.create(data)
}

module.exports = saveOne
