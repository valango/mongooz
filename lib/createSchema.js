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

const getType = (name) => {
  const type = types[name]

  if (type === undefined) {
    throw new Error(format('Invalid field type %o', name))
  }
  return type
}

/**
 * Create new schema.
 * @param {Object} givenDefinition
 * @param {Object} [options]
 * @returns {mongoose.Schema}
 */
const createSchema = (givenDefinition, options = {}) => {
  const definition = {}

  forEach(givenDefinition, (fieldDescriptor, key) => {
    let dsc, type

    if ((type = typeof fieldDescriptor) === 'function' || key[0] === '$') {
      return
    }

    if (type === 'string') {
      if (getGeoSchema.validTypes.includes(fieldDescriptor)) {
        dsc = getGeoSchema(fieldDescriptor)
      } else {
        dsc = { type: getType(fieldDescriptor) }
      }
    } else {
      dsc = { ...fieldDescriptor }

      if (typeof (type = dsc.type) === 'string') {
        dsc.type = getType(type)
      }
      if (dsc.index === true) dsc.index = { background: false }
    }
    definition[key] = dsc
  })

  const schema = new Schema(definition, options)

  ;(givenDefinition.$index || []).forEach(def => schema.index(def))

  return schema
}

module.exports = createSchema
