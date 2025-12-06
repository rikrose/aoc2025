import { Schema, type Array as EffectArray, Context } from "effect";

export const Day = Schema.Number.pipe(
  Schema.between(1, 12),
  Schema.brand("Day"),
);
export type Day = typeof Day.Type;
export const parseDay = Schema.decodeUnknown(Day);

export const Part = Schema.Number.pipe(
  Schema.between(1, 2),
  Schema.brand("Part"),
);
export type Part = typeof Part.Type;
export const parsePart = Schema.decodeUnknown(Part);

export class DayAndPart extends Schema.Class<DayAndPart>("DayAndPart")({
  day: Day,
  part: Part,
}) {}

export class NextRequestBody extends Schema.Class<NextRequestBody>(
  "NextRequestBody",
)({
  body: Schema.NonEmptyArray(Schema.NonEmptyTrimmedString),
}) {}

export class RequestData extends Context.Tag("RequestData")<
  RequestData,
  {
    body: EffectArray.NonEmptyReadonlyArray<string>;
  }
>() {}

export class AnswerData extends Schema.Class<AnswerData>("AnswerData")({
  answer: Schema.String,
}) {}
