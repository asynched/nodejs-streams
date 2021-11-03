import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
  read: function () {
    this.push('Hello, world!')
    this.push('Hello, world!')
    this.push('Hello, world!')
    this.push(null)
  },
})

const writableStream = Writable({
  write: function (chunk, _encoding, callback) {
    console.log('[BUFFER]:', chunk)
    console.log('[DATA]: %s\n', chunk.toString())
    callback()
  },
})

await pipelineAsync(readableStream, writableStream)
