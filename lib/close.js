//  lib/close.js
'use strict'

/**
 * @param {Connection} db
 * @param {boolean} [noWait]
 * @returns {Promise<boolean|number>}
 */
const close = async (db, noWait = false) => {
  if (db.readyState !== 1) return db.readyState

  if (!noWait) {
    const models = Reflect.ownKeys(db.models).map(key => db.models[key])

    await Promise.all(models.map(model => model.ensureIndex()))
  }
  await db.close()

  return true
}

module.exports = close
