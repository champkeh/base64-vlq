const assert = require('assert')
const {base64VlqDecode} = require('../src/index')

const tests = [
    ['AAAA', [0, 0, 0, 0]],
    ['AAgBC', [0, 0, 16, 1]],
    ['EAAA', [2, 0, 0, 0]],
    ['B', [-0]],
    ['AAAA', [0, 0, 0, 0]],
    ['MAAM', [6, 0, 0, 6]],
    ['SAAS', [9, 0, 0, 9]],
    ['CAAC', [1, 0, 0, 1]],
    ['QAAyB', [8, 0, 0, 25]],
    ['IAAI', [4, 0, 0, 4]],
    ['SAAS', [9, 0, 0, 9]],
    // ['+/////D', [2147483647]]
];

tests.forEach(function (test) {
    assert.deepEqual(base64VlqDecode(test[0]), test[1]);
});

console.log('all vlq.decode tests passed');
