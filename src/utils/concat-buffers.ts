export function concatBuffers(bufs: Uint8Array[]): Uint8Array {
  const arr = new Uint8Array(bufs.reduce((acc, buf) => acc + buf.length, 0));
  let offset = 0;
  for (const buf of bufs) {
    arr.set(buf, offset);
    offset += buf.byteLength;
  }
  return arr;
}
