# surd
> A blazing fast binary serialization library

## Goals
- 100% TypeScript inference
- Browser and Node.js support
- Fast serialization/deserialization
- Compact binary sizes

## Non-goals
- Binary validation

## Usage

```js
import { t } from "surd";

const schema = t.string;

const serialized = schema.serialize("hello world");
const [deserialized, trailing] = schema.deserialize(serialized);

assert(deserialized === "hello world")
asserts(trailing.byteLength === 0);
```


### Packer
A minimal data compressor that run-length encodes zeroes, useful for low numbers which contain lots of padding zeroes.

```js
import { pack, t, unpack } from "surd";

const schema = t.uint32;

const serialized = schema.serialize(12);
const packed = pack(serialized);

assert(packed.byteLength < serialized.byteLength);

const [deserialized] = schema.deserialize(unpack(serialized));
assert(deserialized === 12);
```

### TypeScript
```ts
import { t, type TypeOf } from "surd";

const point = t.struct({
  x: t.int16,
  y: t.int16
});

type Point = TypeOf<typeof point>;
// equivalent to
type Point = { x: number; y: number };
```

## Types
```js
import { t } from "surd";

// numbers
t.float32;
t.float64;
t.uint8;
t.uint16;
t.uint32;
t.int8;
t.int16;
t.int32;
t.bigint64;
t.biguint64;

// other primitives/builtin types
t.string;
t.boolean;
t.date;
t.arrayBuffer;

// literals
t.literal("foo") // any primitive
t.undefined; // aliased as t.void for TypeScript reasons
t.null;

// compound types
t.array(t.string); // -> string[]
t.map(t.string, t.boolean); // -> Map<string, boolean>
t.set(t.uint32); // -> Set<number>
t.tuple(t.string, t.int32, t.boolean); // -> [string, number, boolean]
t.struct({
  foo: t.uint8,
  bar: t.int32,
  baz: t.boolean,
}); // -> { foo: number, bar number, baz: boolean }

// nullability
t.nullOr(t.string); // -> string | null
t.undefinedOr(t.string); // -> string | undefined

// enums
t.enum("foo", "bar", 12, true); // -> "foo" | "bar" | 12 | true
t.union({
  loggedIn: t.struct({ username: t.string }),
  loggedOut: t.void,
}) // -> ["loggedIn", { username: string }] | ["loggedOut", void];
```