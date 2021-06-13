//  index.js
'use strict'

const { Schema } = require('mongoose')

module.exports = {
  connect: require('./lib/connect'),
  createGeoSchema: require('./lib/createGeoSchema'),
  createModel: require('./lib/createModel'),
  createSchema: require('./lib/createSchema'),
  Schema
}
