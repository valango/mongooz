//  lib/syncIndexes.js
'use strict'

/**
 * @param {Connection} db
 * @param {...Model} [model]
 * @returns {Promise<*[]>}
 */
const syncIndexes = (db, ...model) => {
  const allModels = model[0]
    ? model.map(item => typeof item === 'string' ? db.models[item] : item)
    : Reflect.ownKeys(db.models).map(key => db.models[key])

  return Promise.all(allModels.map(model => model.ensureIndexes()))
}

module.exports = syncIndexes
