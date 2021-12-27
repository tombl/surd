export function format(
  value: null | undefined | string | number | boolean | symbol | bigint
) {
  return value === null
    ? "null"
    : value === undefined
    ? "undefined"
    : typeof value === "string"
    ? JSON.stringify(value)
    : String(value);
}
