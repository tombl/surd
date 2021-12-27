import type { Type } from "../type";
import { format } from "../utils/format";

export function literal<
  T extends null | undefined | string | number | boolean | symbol | bigint
>(value: T): Type<T> {
  return {
    name: format(value),
    serialize(v) {
      if (value !== v) {
        throw new TypeError(`expected ${value}, got ${v}`);
      }
      return new Uint8Array();
    },
    deserialize(buf) {
      return [value, buf];
    },
  };
}
const literalUndefined: Type<undefined> = literal(undefined);
const literalVoid: Type<void> = literalUndefined;
const literalNull: Type<null> = literal(null);
export {
  literalUndefined as undefined,
  literalVoid as void,
  literalNull as null,
};
