const stdin = process.stdin.on('data', (message) =>
  console.log(`[MESSAGE]: ${message.toString()}`)
)

stdin.pipe(process.stdout)
