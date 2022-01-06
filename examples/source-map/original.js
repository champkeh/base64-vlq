/**
 * 把数组转成最小数
 * @param {number[]} arr
 */
function convertArray2Min(arr) {
    return arr.map(n => n.toString()).sort((a, b) => {
        const ab = `${a}${b}`
        const ba = `${b}${a}`
        if (+ab > +ba) {
            return 1
        } else {
            return -1
        }
    }).join('')
}

function test(arr, expected) {
    const actual = convertArray2Min(arr)
    console.log(actual, actual === expected ? '正确' : '错误')
}

// test([10, 2], '102')
// test([3, 30, 34, 5, 9], '3033459')
test()
