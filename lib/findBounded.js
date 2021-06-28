//  lib/findBounded.js
'use strict'

const pointsEq = ([x0, y0], [x1, y1]) => x0 === x1 && y0 === y1

const findBounded = (model, fields, bounds, geometryField = 'geometry') => {
  let query = model.find(fields)

  if (bounds) {
    if (!pointsEq(bounds[0], bounds.slice(-1))) bounds.push(bounds[0])

    query = query.where(geometryField).intersects().geometry({
      coordinates: [bounds], type: 'Polygon'
    })
  }

  return query
}

module.exports = findBounded
