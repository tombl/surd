import type { Type } from "../type";
import { concatBuffers } from "../utils/concat-buffers";

export function tuple<T extends unknown[]>(
  ...types: { [K in keyof T]: Type<T[K]> }
): Type<T> {
  return {
    name: `[${types.map((t) => t.name).join(", ")}]`,
    serialize(arr) {
      return concatBuffers(
        arr.map((value, index) => types[index].serialize(value))
      );
    },
    deserialize(buf) {
      const items: unknown[] = new Array(types.length);
      for (const [i, type] of types.entries()) {
        [items[i], buf] = type.deserialize(buf);
      }
      return [items as T, buf];
    },
  };
}
