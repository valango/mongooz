//  index.js
'use strict'

const { Schema } = require('mongoose')

exports = module.exports = {
  connect: require('./lib/connect'),
  createGeoSchema: require('./lib/createGeoSchema'),
  createModel: require('./lib/createModel'),
  createSchema: require('./lib/createSchema'),
  findBounded: require('./lib/findBounded'),
  getTotals: require('./lib/getTotals'),
  syncIndexes: require('./lib/syncIndexes'),
  saveOne: require('./lib/saveOne'),
  Schema
}

Object.assign(exports, require('./lib/postJSON'))
