export function pack(arr: Uint8Array): Uint8Array {
  const out = [];
  let zeroes = 0;
  for (const item of arr) {
    if (item == 0) {
      if (zeroes === 255) {
        out.push(0);
        out.push(255);
        zeroes = 0;
      }
      zeroes++;
    } else {
      if (zeroes !== 0) {
        out.push(0);
        out.push(zeroes);
        zeroes = 0;
      }
      out.push(item);
    }
  }
  if (zeroes !== 0) {
    out.push(0);
    out.push(zeroes);
  }
  return new Uint8Array(out);
}

export function unpack(arr: Uint8Array): Uint8Array {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      const count = arr[++i];
      for (let j = 0; j < count; j++) {
        out.push(0);
      }
    } else {
      out.push(arr[i]);
    }
  }
  return new Uint8Array(out);
}
