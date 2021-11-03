import http from 'http'
import { createReadStream } from 'fs'

http
  .createServer((request, response) => {
    createReadStream('bigfile.txt').pipe(response)
  })
  .listen(3000, () => console.log('Running on port 3000'))
