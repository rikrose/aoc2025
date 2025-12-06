import { Schema } from "effect";

export class RequestError extends Schema.Class<RequestError>("RequestError")({
  errorMessage: Schema.String,
}) {}

export class DataParseError extends Schema.TaggedError<DataParseError>()(
  "DataParseError",
  {},
) {}

export class CalculationError extends Schema.TaggedError<CalculationError>()(
  "CalculationError",
  {},
) {}
