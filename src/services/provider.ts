import { Context, Effect } from "effect";
import type { AnswerData, RequestData } from "./schema";
import type { CalculationError, DataParseError } from "./errors";

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
