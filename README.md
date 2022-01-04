# base64-vlq

## Install
```shell
npm i base64-vlq
```

## Usage
```js
const {vlqEncode, vlqDecode} = require('base64-vlq')

// VLQ encode a integer
vlqEncode(31) // [62, 1]

// VLQ decode a value
vlqDecode([62, 1]) // 31
```

```js
const {base64VlqEncode, base64VlqDecode} = require('base64-vlq')

// base64-vlq encode a integer array
base64VlqEncode([62, 1]) // 8DC

// base64-vlq decode a value
base64VlqDecode('8DC') // [62, 1]
```
