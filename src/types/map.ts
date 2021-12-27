import { array } from "./array";
import type { Type } from "../type";
import { tuple } from "./tuple";

export function map<K, V>(key: Type<K>, value: Type<V>): Type<Map<K, V>> {
  const inner = array(tuple(key, value));
  return {
    name: `Map<${key.name}, ${value.name}>`,
    serialize(map) {
      return inner.serialize([...map]);
    },
    deserialize(buf) {
      const [entries, rest] = inner.deserialize(buf);
      return [new Map(entries), rest];
    },
  };
}
