import { Schema } from "effect";

export const Day = Schema.Number.pipe(
  Schema.between(1, 12),
  Schema.brand("Day"),
);
export type Day = typeof Day.Type;

export const Part = Schema.Number.pipe(
  Schema.between(1, 2),
  Schema.brand("Part"),
);
export type Part = typeof Part.Type;

export class RequestData extends Schema.Class<RequestData>("RequestData")({
  data: Schema.NonEmptyArray(Schema.String),
  day: Day,
  part: Part,
}) {}

export class AnswerData extends Schema.Class<AnswerData>("AnswerData")({
  answer: Schema.String,
}) {}
