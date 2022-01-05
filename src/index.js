const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const BIT_MASKS = {
    LEAST_FOUR_BITS: 0b1111,
    LEAST_FIVE_BITS: 0B11111,
    CONTINUATION_BIT: 0B100000,
    SIGN_BIT: 0B1,
}

const REVERSE_BASE64_ALPHABET = (() => {
   const characterIndexPairs = BASE64_ALPHABET.split('').map((c, i) => [c, i])
   return new Map(characterIndexPairs)
})()

/**
 * base64-vlq 编码一个整数数组
 * @param integers 整数数组
 * @return {string} base64 字符串
 */
function base64VlqEncode(integers) {
    return integers
        .map(vlqEncode)
        .map(base64Encode)
        .join('')
}

/**
 * vlq 编码一个整数，变成一个 sextet 序列
 * @param {number} x
 * @return {number[]}
 */
function vlqEncode(x) {
    if (Object.is(x, 0)) {
        return [0]
    } else if (Object.is(x, -0)) {
        return [1]
    }

    let absX = Math.abs(x)
    const sextets = []
    while (absX > 0) {
        let sextet = 0
        if (sextets.length === 0) {
            sextet = x < 0 ? 1 : 0  // set the sign bit
            sextet |= (absX & BIT_MASKS.LEAST_FOUR_BITS) << 1   // shift one ot make space for sign bit
            absX >>>= 4
        } else {
            sextet = absX & BIT_MASKS.LEAST_FIVE_BITS
            absX >>>= 5
        }
        if (absX > 0) {
            sextet |= BIT_MASKS.CONTINUATION_BIT
        }
        sextets.push(sextet)
    }
    return sextets
}

/**
 * 将一个 sextet 序列编码成 base64 字符串
 * @param {number[]} sextets
 * @return {string} base64 字符串
 */
function base64Encode(sextets) {
    let base64Vlq = ''
    sextets.forEach(sextet => {
        base64Vlq += BASE64_ALPHABET[sextet]
    })
    return base64Vlq
}

/**
 *
 * @param {string} base64Vlqs
 * @return {number[]}
 */
function base64VlqDecode(base64Vlqs) {
    const sextets = base64Decode(base64Vlqs)
    return splitVlqs(sextets).map(vlqDecode)
}

/**
 * base64 解码字符串，变成 sextet 序列
 * @param {string} base64Vlqs
 * @return {number[]} sextet 序列
 */
function base64Decode(base64Vlqs) {
    return base64Vlqs.split('').map(c => {
        const sextet = REVERSE_BASE64_ALPHABET.get(c)
        if (sextet === undefined) {
            throw new Error(`${base64Vlqs} is not a valid base64 encoded VLQ`)
        }
        return sextet
    })
}

/**
 * 拆分有效的 vlq 值
 * @param {number[]} sextets
 * @return {number[]}
 */
function splitVlqs(sextets) {
    const splitVlqs = []
    let vlq = []
    sextets.forEach(sextet => {
        vlq.push(sextet)
        if ((sextet & BIT_MASKS.CONTINUATION_BIT) === 0) {
            splitVlqs.push(vlq)
            vlq = []
        }
    })
    if (vlq.length > 0) {
        throw new Error('Malformed VLQ sequence: The last VLQ never ended.')
    }
    return splitVlqs
}

/**
 * vlq 解码一个 sextet 序列，变成一个整数
 * @param {number[]} sextets
 * @return {number}
 */
function vlqDecode(sextets) {
    let x = 0
    let isNegative = false
    sextets.reverse().forEach((sextet, index) => {
        if (index === sextets.length - 1) {
            isNegative = (sextet & BIT_MASKS.SIGN_BIT) === 1
            sextet >>>= 1   // discard sign bit
            x <<= 4
            x |= sextet & BIT_MASKS.LEAST_FOUR_BITS
        } else {
            x <<= 5
            x |= sextet & BIT_MASKS.LEAST_FIVE_BITS
        }
    })
    return isNegative ? -x : x
}

module.exports = {
    base64VlqEncode,
    base64VlqDecode,
    vlqEncode,
    vlqDecode,
}
