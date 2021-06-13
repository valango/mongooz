//  lib/close.js
'use strict'

/**
 * @param {Connection} db
 * @param {boolean} [noWait]
 * @returns {Promise<boolean>}
 */
const close = async (db, noWait = false) => {
  if (db.readyState === 1 && !noWait) {
    /** @type {Model[]} */
    const models = Reflect.ownKeys(db.models).map(key => db.models[key])

    await Promise.all(models.map(model => model.ensureIndexes()))
  }
  await db.close()

  return true
}

module.exports = close
