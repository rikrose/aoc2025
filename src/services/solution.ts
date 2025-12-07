import { Effect, Layer, LayerMap, Schema } from "effect";
import { RequestError } from "./errors";
import { SolutionProvider } from "./provider";
import {
  DayAndPart,
  NextRequestBody,
  parseDay,
  parsePart,
  RequestData,
} from "./schema";

import { Day1 } from "./solutions/day1";

export interface SolutionShape {
  readonly solve: () => Effect.Effect<
    AnswerData,
    DataParseError | CalculationError
  >;
}

export class SolutionProvider extends Context.Tag("SolutionProvider")<
  SolutionProvider,
  SolutionShape
>() {}

export class SolutionProviderMap extends LayerMap.Service<SolutionProviderMap>()(
  "SolutionProviderMap",
  {
    lookup: (dayAndPart: DayAndPart) => {
      const layers = [Day1];

      const parts = layers[dayAndPart.day - 1];
      if (!parts)
        return Layer.fail(new RequestError({ errorMessage: "Unknown day" }));
      const layer = parts[dayAndPart.part - 1];
      if (!layer)
        return Layer.fail(new RequestError({ errorMessage: "Unknown part" }));

      return layer;
    },
  },
) {}

const runSolver = Effect.gen(function* () {
  const provider = yield* SolutionProvider;
  return yield* provider.solve();
});

export const routeHandler = Effect.fn("main")(function* (
  nextRequest: {
    body: unknown;
  },
  ctx: { day: unknown; part: unknown },
) {
  const parsedBody = yield* Schema.decodeUnknown(NextRequestBody)(nextRequest);
  const dayAndPart = new DayAndPart({
    day: yield* parseDay(ctx.day),
    part: yield* parsePart(ctx.part),
  });
  return yield* runSolver.pipe(
    Effect.provide(SolutionProviderMap.get(dayAndPart)),
    Effect.provideService(RequestData, { body: parsedBody.body }),
  );
});

export const SolverLiveLayer = SolutionProviderMap.Default;
