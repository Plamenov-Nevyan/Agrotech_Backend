const Readable = require('stream').Readable

module.exports = (fileBuffer) => {
  const stream = new Readable()
  stream.push(fileBuffer)
  stream.push(null)
  return stream
}