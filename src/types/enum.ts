import type { Type } from "../type";
import { format } from "../utils/format";
import { uint16, uint32, uint8 } from "./numbers";

function enumeration<
  T extends null | undefined | string | number | boolean | symbol | bigint
>(...values: T[]): Type<T> {
  const inner =
    values.length < 2 ** 8 ? uint8 : values.length < 2 ** 16 ? uint16 : uint32;

  return {
    name: values.map((value) => format(value)).join(" | "),
    serialize(value) {
      const index = values.indexOf(value);
      if (index === -1) {
        throw new TypeError("unexpected value");
      }
      return inner.serialize(index);
    },
    deserialize(buf) {
      const [index, rest] = inner.deserialize(buf);
      return [values[index], rest];
    },
  };
}

export { enumeration as enum };
