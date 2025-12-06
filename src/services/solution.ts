import { Context, Effect, Layer, LayerMap, Match } from "effect";
import {
  RequestError,
  type CalculationError,
  type DataParseError,
} from "./errors";
import type { AnswerData, RequestData } from "./schema";

import { Day1, day1ProviderLayer } from "./solutions/day1";
import { assertUnreachable } from "@/lib/assert-unreachable";

export interface SolutionShape {
  readonly part1: (
    input: RequestData,
  ) => Effect.Effect<AnswerData, DataParseError | CalculationError>;
  readonly part2: (
    input: RequestData,
  ) => Effect.Effect<AnswerData, DataParseError | CalculationError>;
}

export class SolutionProvider extends Context.Tag("SolutionProvider")<
  SolutionProvider,
  SolutionShape
>() {}

export class SolutionProviderMap extends LayerMap.Service<SolutionProviderMap>()(
  "SolutionProviderMap",
  {
    layers: {
      day1: day1ProviderLayer /*
      day2: day1ProviderLayer,
      day3: day1ProviderLayer,
      day4: day1ProviderLayer,
      day5: day1ProviderLayer,
      day6: day1ProviderLayer,
      day7: day1ProviderLayer,
      day8: day1ProviderLayer,
      day9: day1ProviderLayer,
      day10: day1ProviderLayer,
      day11: day1ProviderLayer,
      day12: day1ProviderLayer, */,
    },
  },
) {}
type AvailableDays = "1" /*
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12" */;
export type AvailableSolutions = `day${AvailableDays}`;
export type AvailableParts = "part1" | "part2";

const runSolver = Effect.fn("runSolver")(function* (input: RequestData) {
  const provider = yield* SolutionProvider;
  switch (input.part) {
    case 1:
      return yield* provider.part1(input);
    case 2:
      return yield* provider.part2(input);
  }
});

export const SolverLiveLayer = SolutionProviderMap.Default.pipe(
  Layer.provide(Layer.succeed(Day1, {})),
);

export const runSolution = Effect.fn("main")(function* (input: RequestData) {
  return yield* runSolver(input).pipe(
    Effect.provide(SolutionProviderMap.get(input.day)),
  );
}, Effect.provide(SolverLiveLayer));
