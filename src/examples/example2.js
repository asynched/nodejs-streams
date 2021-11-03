import http from 'http'
import { readFileSync } from 'fs'

http
  .createServer((request, response) => {
    const file = readFileSync('bigfile.txt')
    response.write(file)
    response.end()
  })
  .listen(3000, () => console.log('Running on port 3000'))
