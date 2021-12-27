export interface Type<T> {
  name: string;
  serialize(value: T): Uint8Array;
  /**
   * @returns a tuple containing the deserialized value and the trailing unused binary data
   */
  deserialize(buf: Uint8Array): [value: T, rest: Uint8Array];
}

export type TypeOf<T extends Type<unknown>> = T extends Type<infer U>
  ? U
  : never;
