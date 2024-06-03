import { test, expect } from 'vitest';
import { generateId, assert } from '../model/utils.js';

const _ = require('lodash');

test('generate id is type of string', () => {
    const id = generateId();
    expect(id).toBeTypeOf('string');
});

test("generated 1000 id's are uniq", () => {
    const idArray = [];
    _.range(1000).forEach(e => {
        idArray.push(generateId());
    });

    expect(idArray.length).toBe(_.uniq(idArray).length);
});

test("assert throws", () => {
    expect(()=> assert(false)).toThrowError('assertion failed');
    expect(() => assert(false, 'error message')).toThrow('error message');
});

test('assert not throws', () => {
    expect(() =>  assert(true)).not.toThrowError();
});
