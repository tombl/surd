import { uint32 } from "./numbers";
import type { Type } from "../type";
import { concatBuffers } from "../utils/concat-buffers";

export function array<T>(type: Type<T>): Type<T[]> {
  return {
    name: `Array<${type.name}>`,
    serialize(arr) {
      const bufs: Uint8Array[] = [];
      bufs.push(uint32.serialize(arr.length));
      for (const value of arr) {
        bufs.push(type.serialize(value));
      }
      return concatBuffers(bufs);
    },
    deserialize(buf) {
      let length;
      [length, buf] = uint32.deserialize(buf);
      const arr = Array(length) as T[];
      for (let i = 0; i < length; i++) {
        [arr[i], buf] = type.deserialize(buf);
      }
      return [arr, buf];
    },
  };
}
