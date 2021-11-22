#! /usr/bin/env node
// example usage: cat db.yaml | node tag stringData.boo 123 > new.yaml
const yaml = require('yaml')

const path = process.argv[2]
const tag = process.argv[3]
const stdin = process.openStdin()

let data = ''

stdin.on('data', function (chunk) {
  data += chunk
})

stdin.on('end', function () {
  const parsed = yaml.parse(data)
  const stops = path.split('.')
  const end = stops.pop()
  let ref = parsed
  stops.forEach(stop => {
    if (ref[stop]) {
      if (typeof ref[stop] === 'object') {
        ref = ref[stop]
      } else {
        ref[stop] = {}
        ref = ref[stop]
      }
    } else {
      ref[stop] = {}
      ref = ref[stop]
    }
  })
  ref[end] = tag
  process.stdout.write(yaml.stringify(parsed))
})
