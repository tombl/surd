import type { Type } from "../type";
import { concatBuffers } from "../utils/concat-buffers";
import { uint16, uint32, uint8 } from "./numbers";

export function union<T extends { [key: string]: unknown }>(types: {
  [K in keyof T]: Type<T[K]>;
}): Type<{ [K in keyof T]: K extends string ? [K, T[K]] : never }[keyof T]> {
  const sortedTypes = Object.keys(types).sort();
  const tagType =
    sortedTypes.length < 2 ** 8
      ? uint8
      : sortedTypes.length < 2 ** 16
      ? uint16
      : uint32;
  return {
    name: Object.values(types)
      .map((t: Type<unknown>) => t.name)
      .join(" | "),
    serialize([tag, value]) {
      return concatBuffers([
        tagType.serialize(sortedTypes.indexOf(tag as string)),
        types[tag].serialize(value),
      ]);
    },
    deserialize(buf) {
      const [index, rest] = tagType.deserialize(buf);
      const [value, rest2] = types[sortedTypes[index]].deserialize(rest);
      return [
        [sortedTypes[index], value] as {
          [K in keyof T]: K extends string ? [K, T[K]] : never;
        }[keyof T],
        rest2,
      ];
    },
  };
}
