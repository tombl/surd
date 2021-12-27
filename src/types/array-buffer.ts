import { uint32 } from "./numbers";
import type { Type } from "../type";
import { concatBuffers } from "../utils/concat-buffers";

export const arrayBuffer: Type<ArrayBuffer> = {
  name: "ArrayBuffer",
  serialize(arr) {
    const length = uint32.serialize(arr.byteLength);
    return concatBuffers([length, new Uint8Array(arr)]);
  },
  deserialize(buf) {
    const [length, rest] = uint32.deserialize(buf);
    const arr = rest.slice(0, length);
    return [arr, rest.slice(length)];
  },
};
