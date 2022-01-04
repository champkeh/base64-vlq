const {base64VlqEncode, base64VlqDecode, vlqEncode, vlqDecode} = require('../index')

// console.log(base64VlqEncode([62, 1]))
console.log(base64VlqDecode('8DC'))

// 'CAaA,SAAWA,EAAQC,GACnB,YAo5BA,SAASC'.split(',').forEach(vlq => {
//     console.log(base64VlqDecode(vlq))
// })
// console.log(base64VlqDecode('AAgBC'))
// console.log(vlqEncode(31))
// console.log(vlqDecode([62, 1]))
