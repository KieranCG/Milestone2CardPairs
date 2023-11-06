/**
 * @jest-environment jsdom
 */

const sum = require('../game');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});