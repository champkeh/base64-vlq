const {
    encodeDecimal,
    encodeDecimalArray,
    encode,
    decodeSegment,
    decodeMappings,
    decode,
    interpretMappings,
} = require('./parser')

console.log(encode(42))
console.log(encode([0, 11, 2, 9, 7, 6, 2, 4, -9, 11, 7, -8, 5, 9]))
console.log(encode([7]))
console.log(encode(10))
console.log(encode(1200))
console.log(encode(-17))
console.log(encode(1))
console.log(encode([10, 1200]))
console.log(encode([1, 2, 3, 4]))
console.log(decode('O'))
console.log(decode('UgrC'))
console.log(decode('DECODEME'))
const res = decode(';EAEE,EAAE,EAAC,CAAE;ECQY,UACC')
console.log(res)
