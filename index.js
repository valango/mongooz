//  index.js
'use strict'

const { Schema } = require('mongoose')

module.exports = {
  connect: require('./lib/connect'),
  createGeoSchema: require('./lib/createGeoSchema'),
  createModel: require('./lib/createModel'),
  createSchema: require('./lib/createSchema'),
  postJSON: require('./lib/postJSON'),
  syncIndexes: require('./lib/syncIndexes'),
  saveOne: require('./lib/saveOne'),
  Schema
}
