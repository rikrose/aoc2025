import { Context, type Effect } from "effect";
import type { CalculationError, DataParseError } from "./errors";
import type { AnswerData, RequestData } from "./schema";

export interface SolutionShape {
  readonly solve: () => Effect.Effect<
    AnswerData,
    DataParseError | CalculationError,
    RequestData
  >;
}

export class SolutionProvider extends Context.Tag("SolutionProvider")<
  SolutionProvider,
  SolutionShape
>() {}
