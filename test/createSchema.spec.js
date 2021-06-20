'use strict'
/* eslint-env jest */

const {normalize} = require('../lib/createSchema')

describe('createSchema.normalize', () => {
  it('should expand', () => {
    const res = normalize({
      a: 'number', b: String, c: { type: 'number' }, d: { type: String }
    })
    console.log(res)
    expect(res).toEqual({
      a: { type: Number },
      // b: { type: String },
      c: { type: Number },
      d: { type: String }
    })
  })
})
