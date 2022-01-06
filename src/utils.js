const {base64VlqDecode} = require('./index')

/**
 * 格式化segment
 * @param segment
 * @param sources
 * @param names
 * @return {string}
 */
function formatSegment(segment, sources, names) {
    const column = segment[0] + 1
    const source = sources[segment[1]]
    const line = segment[2] + 1
    const col = segment[3] + 1
    let name
    if (segment.length === 5) {
        name = names[segment[4]]
    }

    return `${column} => ${source} ${line}:${col}${name ? ' ' + name : ''}`
}

/**
 * 格式化mappings
 * @param decodedMappings
 * @param sources
 * @param names
 * @return {*}
 */
function formatMappings(decodedMappings, sources, names) {
    return decodedMappings.reduce((mappings, line, idx) => {
        const lineNo = idx + 1
        if (!mappings[lineNo]) {
            mappings[lineNo] = []
        }

        mappings[lineNo].push(...line.map(seg => formatSegment(seg, sources, names)))
        return mappings
    }, {})
}

/**
 * 解码SourceMap文件
 * @param sourceMap
 */
function decodeSourceMap(sourceMap) {
    const {names, sources, mappings} = sourceMap

    let offsetColumn = 0 // field 1
    let offsetSourceIndex = 0 // field 2
    let offsetOriginalLine = 0 // field 3
    let offsetOriginalColumn = 0 // field 4
    let offsetNameIndex = 0 // field 5

    const decodedMappings = mappings.split(';').map(line => {
        offsetColumn = 0 // 每行都需要重置列号
        return line.split(',').map(seg => {
            const fields = base64VlqDecode(seg)

            if (fields.length === 1) {
                fields[0] += offsetColumn
                offsetColumn = fields[0]
            } else if (fields.length === 4) {
                fields[0] += offsetColumn
                fields[1] += offsetSourceIndex
                fields[2] += offsetOriginalLine
                fields[3] += offsetOriginalColumn
                offsetColumn = fields[0]
                offsetSourceIndex = fields[1]
                offsetOriginalLine = fields[2]
                offsetOriginalColumn = fields[3]
            } else if (fields.length === 5) {
                fields[0] += offsetColumn
                fields[1] += offsetSourceIndex
                fields[2] += offsetOriginalLine
                fields[3] += offsetOriginalColumn
                fields[4] += offsetNameIndex
                offsetColumn = fields[0]
                offsetSourceIndex = fields[1]
                offsetOriginalLine = fields[2]
                offsetOriginalColumn = fields[3]
                offsetNameIndex = fields[4]
            } else {
                throw new Error('invalid source map segment')
            }

            return fields
        })
    })

    return {
        ...sourceMap,
        mappings: formatMappings(decodedMappings, sources, names),
    }
}

module.exports = {
    decodeSourceMap,
}
