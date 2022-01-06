const fs = require('fs')
const path = require('path')
const {decodeSourceMap} = require('../src/utils')


const fileContent = fs.readFileSync(path.resolve(__dirname, '../examples/source-map/generate.js.map'), {encoding: 'utf-8'})
const sourceMap = JSON.parse(fileContent)

console.log(decodeSourceMap(sourceMap))
