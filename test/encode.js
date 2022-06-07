const assert = require('assert')
const {base64VlqEncode} = require('../src/index')

const tests = [
    [[0, 0, 0, 0], 'AAAA'],
    [[0, 0, 16, 1], 'AAgBC'],
    [[-1], 'D'],
    [[-0], 'B'],
    [[2147483647], '+/////D']
];

tests.forEach(function (test) {
    assert.equal(base64VlqEncode(test[0]), test[1]);
});

console.log('all vlq.encode tests passed');
