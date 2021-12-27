import * as literal from "./literals";
import type { Type } from "../type";
import { union } from "./union";

export function nullOr<T>(type: Type<T>): Type<T | null> {
  const inner = union({ some: type, none: literal.null });
  return {
    name: `${type.name}?`,
    serialize(value) {
      return value === null
        ? inner.serialize(["none", null])
        : inner.serialize(["some", value]);
    },
    deserialize(buf) {
      const [[, value], rest] = inner.deserialize(buf);
      return [value, rest];
    },
  };
}

export function undefinedOr<T>(type: Type<T>): Type<T | undefined> {
  const inner = union({ some: type, none: literal.undefined });
  return {
    name: `${type.name}?`,
    serialize(value) {
      return value === undefined
        ? inner.serialize(["none", undefined])
        : inner.serialize(["some", value]);
    },
    deserialize(buf) {
      const [[, value], rest] = inner.deserialize(buf);
      return [value, rest];
    },
  };
}
