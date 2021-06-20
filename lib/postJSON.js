//  lib/postJSON.js
'use strict'

require('mongoose')

/**
 * @param {Query} query
 * @param {{json: function(Object):*}} res
 */
const postJSON = (query, res) =>
  query.lean().exec()
    .then(data => res.json({ data }))
    .catch(err => res.json({ error: err.message }))

module.exports = postJSON
