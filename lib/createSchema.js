//  lib/util/prepare.js
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
 * @param {string[] | string} definition
 * @returns {*[] | function():*}
 */
const doArray = (definition) => {
  if (Array.isArray(definition)) return definition.map(doArray)
  return getType(definition)
}

/**
 * Prepare schema definition.
 * @param {Object} givenDefinition
 * @returns {Object<{definition:Object, indexes:Array<Object>}>}
 */
const prepare = (givenDefinition) => {
  let definition = {}, indexes = []

  forEach(givenDefinition, (fieldDescriptor, key) => {
    let dsc, type

    if (key === '$index') {
      return (indexes = fieldDescriptor)
    }
    if ((type = typeof fieldDescriptor) === 'function') {
      return (definition[key] = { type: fieldDescriptor })
    }

    if (type === 'string') {
      if (getGeoSchema.validTypes.includes(fieldDescriptor)) {
        dsc = getGeoSchema(fieldDescriptor)
      } else {
        dsc = { type: getType(fieldDescriptor) }
      }
    } else if (Array.isArray(fieldDescriptor)) {
      dsc = doArray(fieldDescriptor)
    } else if (type === 'object') {
      dsc = { ...fieldDescriptor }

      if (typeof (type = dsc.type) === 'string') {
        dsc.type = getType(type)
      }
      if (dsc.index === true) dsc.index = { background: false }
    } else {
      throw new Error(format('Field %o has invalid definition!', key))
    }
    definition[key] = dsc
  })
  return { definition, indexes }
}

const createSchema = (schemaDefinition, options = {}) => {
  const { definition, indexes } = prepare(schemaDefinition)

  const schema = new Schema(definition, options)

  indexes.forEach(def => schema.index(def))

  return schema
}

exports = module.exports = createSchema

Object.assign(exports, { createSchema, prepare })
