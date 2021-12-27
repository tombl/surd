import { uint8 } from "./numbers";
import type { Type } from "../type";

export const boolean: Type<boolean> = {
  name: "boolean",
  serialize(value) {
    return uint8.serialize(value ? 1 : 0);
  },
  deserialize(buf) {
    const [value, rest] = uint8.deserialize(buf);
    return [value === 1, rest];
  },
};
