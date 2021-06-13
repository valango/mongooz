//  lib/util/createSchema.js
'use strict'

const getGeoSchema = require('./createGeoSchema')
const { Schema } = require('mongoose')
const forEach = require('lodash.foreach')
const { format } = require('util')

const types = {
  boolean: Boolean,
  date: Date,
  number: Number,
  string: String
}

/**
 * Create new schema.
 * @param {Object} givenDefinition
 * @param {Object} [options]
 * @returns {mongoose.Schema}
 */
const createSchema = (givenDefinition, options = {}) => {
  const definition = {}
  let typ, type

  forEach(givenDefinition, (fieldDescriptor, key) => {
    if (key === '$index') return

    type = typeof fieldDescriptor

    if (key === 'geometry') {
      if (type === 'string') {
        if (!(type = getGeoSchema(fieldDescriptor))) {
          throw new Error(format('Invalid geometry type %o', fieldDescriptor))
        }
        definition[key] = type
      }
    } else {
      const dsc = type === 'string' ? { type: fieldDescriptor } : { ...fieldDescriptor }

      if (dsc.index === true) dsc.index = { background: false }
      if (typeof (type = dsc.type) === 'string') {
        if (!(type = types[typ = type])) {
          throw new Error(format('Invalid field type %o', typ))
        }
        definition[key] = { ...dsc, type }
      } else {
        definition[key] = dsc
      }
    }
  })

  const schema = new Schema(definition, options)

  ;(givenDefinition.$index || []).forEach(def => schema.index(def))

  return schema
}

module.exports = createSchema
