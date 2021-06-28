//  lib/postJSON.js
'use strict'

require('mongoose')

/**
 * @param {Promise<any>} query
 * @param {{json: function(Object):*}} res
 * @param {function(Error):Object} [errorTranslator]
 */
const postJSON = (query, res, errorTranslator = undefined) =>
  query
    .then(data => res.json({ data }))
    .catch(err => res.json(errorTranslator
      ? errorTranslator(err)
      : { error: err.message }
    ))

/**
 * @param {Query} query
 * @param {{json: function(Object):*}} res
 * @param {function(Error):Object} [errorTranslator]
 */
const postQuery = (query, res, errorTranslator = undefined) =>
  postJSON(query.lean().select({ __v: 0 }).exec(), res, errorTranslator)

module.exports = { postJSON, postQuery }
