import { arrayBuffer } from "./array-buffer";
import type { Type } from "../type";

declare class TextEncoder {
  encode(input: string): Uint8Array;
}
declare class TextDecoder {
  decode(input: ArrayBuffer): string;
}
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
export const string: Type<string> = {
  name: "string",
  serialize(str) {
    return arrayBuffer.serialize(textEncoder.encode(str));
  },
  deserialize(buf) {
    const [arr, rest] = arrayBuffer.deserialize(buf);
    return [textDecoder.decode(arr), rest];
  },
};
