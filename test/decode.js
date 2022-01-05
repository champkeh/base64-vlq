const assert = require('assert')
const {base64VlqDecode} = require('../src/index')

var tests = [
    ['AAAA', [0, 0, 0, 0]],
    ['AAgBC', [0, 0, 16, 1]],
    ['D', [-1]],
    ['B', [-0]],
    ['+/////D', [2147483647]]
];

tests.forEach(function (test) {
    assert.deepEqual(base64VlqDecode(test[0]), test[1]);
});

console.log('all vlq.decode tests passed');
