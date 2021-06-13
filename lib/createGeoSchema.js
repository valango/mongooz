//  lib/utils/createGeoSchema.js
'use strict'

const { Schema } = require('mongoose')
const { format } = require('util')

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

const createGeoSchema = (typeName) => {
  const dsc = getSpatialDefinition(typeName)

  if (dsc.coordinates.type === undefined) throw new Error(format('createGeoSchema(%o): bad type!', typeName))

  return {
    type: new Schema(dsc, { _id: false }),
    index: '2dsphere',
    required
  }
}

module.exports = createGeoSchema
