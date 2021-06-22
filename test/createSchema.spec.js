'use strict'
/* eslint-env jest */

const { createSchema, prepare } = require('../lib/createSchema')
const geoSchema = require('../lib/createGeoSchema')
const { Schema } = require('mongoose')
const index = true
const unique = true

describe('createSchema.prepare', () => {
  it('should expand', () => {
    const res = prepare({
      a: 'number', b: String, c: { type: 'number' }, d: { type: String }, e: ['number']
    })
    expect(res.definition).toEqual({
      a: { type: Number },
      b: { type: String },
      c: { type: Number },
      d: { type: String },
      e: [Number]
    })
    expect(res.indexes).toEqual([])
  })

  it('should fail w bad definition', () => {
    expect(() => prepare({ a: 'boo' })).toThrow(/Invalid.+'boo'/)
    expect(() => prepare({ a: { type: 'boo' } })).toThrow(/Invalid.+'boo'/)
    expect(() => prepare({ a: 12 })).toThrow(/definition/)
  })

  it('should process $index', () => {
    const $index = [{ a: 1 }]
    expect(prepare({ a: 'number', $index }))
      .toEqual({ definition: { a: { type: Number } }, indexes: $index })
  })

  it('should process "index"', () => {
    expect(prepare({ a: { type: 'number', index } }).definition)
      .toEqual({ a: { type: Number, index: { background: false } } })
  })

  it('should process "unique"', () => {
    expect(prepare({ a: { type: 'number', unique } }).definition)
      .toEqual({ a: { type: Number, unique } })
  })

  it('should preserve existing schema', () => {
    const sch = geoSchema('Point')
    expect(prepare({ sch }).definition.sch).toEqual(sch)
  })

  it('should process geoSchema', () => {
    const res = prepare({ a: 'Point' }).definition.a
    expect(res.type).toBeInstanceOf(Schema)
    expect(res.index).toBe('2dsphere')
    expect(res.required).toBe(true)
  })

  it('should create schema', () => {
    expect(createSchema({ a: String })).toBeInstanceOf(Schema)
    expect(createSchema({ a: String, $index: [{ a: 1 }] })).toBeInstanceOf(Schema)
  })
})
