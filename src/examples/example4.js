import net from 'net'

net
  .createServer((socket) => {
    socket.pipe(process.stdout)
  })
  .listen(1338, () => console.log(`Socket server is running on port 1338`))
