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
    if (fieldDescriptor.index === true) fieldDescriptor.index = { background: false }

    if (key === 'geometry') {
      if (typeof fieldDescriptor === 'string') {
        if (!(type = getGeoSchema(fieldDescriptor))) {
          throw new Error(format('Invalid geometry type %o', fieldDescriptor))
        }
        definition[key] = type
      }
    } else if (typeof (type = fieldDescriptor.type) === 'string') {
      if (!(type = types[typ = type])) {
        throw new Error(format('Invalid field type %o', typ))
      }
      definition[key] = { ...fieldDescriptor, type }
    } else {
      definition[key] = { ...fieldDescriptor }
    }
  })

  return new Schema(definition, options)
}

module.exports = createSchema
