//  lib/utils/createModel.js
'use strict'

const create = require('./createSchema')
const { Schema } = require('mongoose')

/**
 * @param {string} name
 * @param {mongoose.Schema | Object} schema
 * @param {mongoose.Connection} connection  - defaults to globals.data.db
 * @returns {mongoose.Model}
 */
const createModel = (name, schema, connection) => {
  return connection.model(name, schema instanceof Schema ? schema : create(schema), name)
}

module.exports = createModel
