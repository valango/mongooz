//  lib/getTotals.js
'use strict'

/**
 * Sums up all numeric fields from array of data records.
 * @param {Object[]} records
 * @returns {Object}
 */
const getTotals = (records) => {
  const keys = records.length && Reflect.ownKeys(records[0])
    .filter(key => typeof records[0][key] === 'number')

  return records.reduce((acc, item) => {
    for (const key of keys) acc[key] += item[key]
    return acc
  })
}

module.exports = getTotals
