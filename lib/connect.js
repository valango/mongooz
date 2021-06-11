//  lib/utils/connect.js
'use strict'

const mongoose = require('mongoose')

const defaults = {
  autoIndex: false,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

/** @returns Promise<mongoose.Connection> */
const _connect = (uri, options) => mongoose.createConnection(uri, options)

/**
 * @param {{dbName:string, dbURI:string, [mongoose]:Object}|string} settings
 * @param {ConnectOptions} [connectionOptions]
 * @param {function(err:Error):*} [errorHandler]
 * @returns {Promise<mongoose.Connection>}
 */
const connect = async (settings, connectionOptions = {}, errorHandler = undefined) => {
  let uri = settings, options = connectionOptions, opts, handler = errorHandler

  if (typeof uri !== 'string') {
    uri = /^\w+:\/\//.test(settings.dbName)
      ? settings.dbName : settings.dbURI + settings.dbName
    opts = settings.mongoose
  }
  if (typeof options === 'function') {
    handler = options
    options = undefined
  }

  const db = await _connect(uri, { ...defaults, ...opts, ...options })

  if (handler) {
    db.on('error', handler)
  } else if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line */
    db.on('error', console.error.bind(console, uri + ':'))
  }

  return db
}

module.exports = connect
