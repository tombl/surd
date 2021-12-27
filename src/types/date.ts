import { float64 } from "./numbers";
import type { Type } from "../type";

export const date: Type<Date> = {
  name: "Date",
  serialize(date) {
    return float64.serialize(date.getTime());
  },
  deserialize(buf) {
    const [time, rest] = float64.deserialize(buf);
    return [new Date(time), rest];
  },
};
