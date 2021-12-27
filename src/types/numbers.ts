import type { Type } from "../type";

function makeArrayBasedType<T extends number | bigint>(ArrayType: {
  new (values: T[]): { buffer: ArrayBuffer };
  new (arrayBuffer: ArrayBuffer): { [index: number]: T };
  BYTES_PER_ELEMENT: number;
}): Type<T> {
  return {
    name: ArrayType.name.slice(0, -5).toLowerCase(),
    serialize(value) {
      return new Uint8Array(new ArrayType([value]).buffer);
    },
    deserialize(buf) {
      return [
        new ArrayType(buf.buffer.slice(0, ArrayType.BYTES_PER_ELEMENT))[0],
        buf.slice(ArrayType.BYTES_PER_ELEMENT),
      ];
    },
  };
}

export const float32: Type<number> = makeArrayBasedType(Float32Array);
export const float64: Type<number> = makeArrayBasedType(Float64Array);
export const uint8: Type<number> = makeArrayBasedType(Uint8Array);
export const uint16: Type<number> = makeArrayBasedType(Uint16Array);
export const uint32: Type<number> = makeArrayBasedType(Uint32Array);
export const int8: Type<number> = makeArrayBasedType(Int8Array);
export const int16: Type<number> = makeArrayBasedType(Int16Array);
export const int32: Type<number> = makeArrayBasedType(Int32Array);
export const bigint64: Type<bigint> = makeArrayBasedType(BigInt64Array);
export const biguint64: Type<bigint> = makeArrayBasedType(BigUint64Array);
