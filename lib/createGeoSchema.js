//  lib/utils/createGeoSchema.js
'use strict'

const { Schema } = require('mongoose')

const required = true

const types = {
  LineString: [[Number]],
  MultiLineString: [[[Number]]],
  Point: [Number],
  Polygon: [[[Number]]]
}

/**
 * Generates a GeoJSON geometry definition.
 * @param {string} typeName
 * @returns {Object}
 */
const getSpatialDefinition = (typeName) => ({
  coordinates: { type: types[typeName], required },
  type: { type: String, enum: [typeName], required }
})

const schemas = Object.create(null)

for (const key of Reflect.ownKeys(types)) {
  schemas[key] = {
    type: new Schema(getSpatialDefinition(key), { _id: false }),
    index: '2dsphere',
    required
  }
}

const getSpatialSchema = (typeName) => {
  return schemas[typeName]
}

module.exports = getSpatialSchema
