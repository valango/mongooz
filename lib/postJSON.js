//  lib/postJSON.js
'use strict'

require('mongoose')
const pick = require('lodash.pick')

/**
 * @param {Promise<any>} query
 * @param {{json: function(Object):*}} res
 * @param {string | string[]} [fieldNames]
 * @param {function(Error):Object} [errorTranslator]
 */
const postJSON = (query, res, fieldNames, errorTranslator = undefined) => {
  let fields = fieldNames, eTran = errorTranslator, type = typeof fields

  if (type === 'function') {
    eTran = fields
    fields = undefined
  } else if (fields) {
    fields = type === 'string' ? fields.split(' ') : fields.slice()
    if (!fields.includes('_id')) fields.push('_id')
  }
  query
    .then(data => {
      if (fields) {
        data = Array.isArray(data) ? data.map(rec => pick(rec, fields)) : pick(data, fields)
      }
      res.json({ data })    })
    .catch(err => res.json(eTran ? eTran(err) : { error: err.message }))
}

/**
 * @param {Query} query
 * @param {{json: function(Object):*}} res
 * @param {function(Error):Object} [errorTranslator]
 */
const postQuery = (query, res, errorTranslator = undefined) =>
  postJSON(query.lean().select({ __v: 0 }).exec(), res, errorTranslator)

module.exports = { postJSON, postQuery }
