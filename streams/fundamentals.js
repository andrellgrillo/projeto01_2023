// Streams Apps - Netflix Spotfy
// 10mb/s - 100s
// 100 -> Inserções no banco de daos
// 10mb/s => 10.000
// Readable Streams / Writable Stream

import { Readable, Writable, Transform } from 'node:stream'

class OneToHoundedStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    },  1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplybyTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHoundedStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplybyTenStream())