import { array } from "./array";
import type { Type } from "../type";

export function set<T>(type: Type<T>): Type<Set<T>> {
  const inner = array(type);
  return {
    name: `Set<${type.name}>`,
    serialize(set) {
      return inner.serialize([...set]);
    },
    deserialize(buf) {
      const [items, rest] = inner.deserialize(buf);
      return [new Set(items), rest];
    },
  };
}
