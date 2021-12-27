import type { Type } from "../type";
import { concatBuffers } from "../utils/concat-buffers";

export function struct<T extends { [key: PropertyKey]: unknown }>(types: {
  [K in keyof T]: Type<T[K]>;
}): Type<T> {
  const sortedKeys: Array<keyof T> = Object.keys(types).sort();
  return {
    name: `{ ${sortedKeys
      .map((key) => `  ${key}: ${types[key].name}`)
      .join(", ")} }`,
    serialize(obj) {
      const bufs: Uint8Array[] = [];
      for (const key of sortedKeys) {
        bufs.push(types[key].serialize(obj[key]));
      }
      return concatBuffers(bufs);
    },
    deserialize(buf) {
      const obj: Partial<T> = {};
      for (const key of sortedKeys) {
        [obj[key], buf] = types[key].deserialize(buf);
      }
      return [obj as T, buf];
    },
  };
}
