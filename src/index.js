import { createWriteStream } from 'fs'
import { pipeline, Readable, Transform } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
  read: function () {
    for (let i = 0; i < 1e5; i++) {
      const person = {
        id: Date.now() + i,
        name: 'Eder',
        age: 20,
      }

      const data = JSON.stringify(person)

      this.push(data)
    }

    this.push(null)
  },
})

const writableMapToCSV = Transform({
  transform: function (chunk, _encoding, callback) {
    const data = JSON.parse(chunk)
    const result =
      Object.entries(data)
        .map(([_key, value]) => value)
        .join(',') + '\n'

    callback(null, result)
  },
})

const setHeader = Transform({
  transform: function (chunk, _encoding, callback) {
    this.counter = this.counter ?? 0

    if (this.counter === 0) {
      this.counter += 1
      return callback(null, `id,name,age\n${chunk}`)
    }

    callback(null, chunk)
  },
})

await pipelineAsync(
  readableStream,
  writableMapToCSV,
  setHeader,
  createWriteStream('data.csv')
)
