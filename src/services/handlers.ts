import { Effect } from "effect";
import { SolutionAPI } from "./api";
import { RequestError } from "./errors";
import { SolutionProvider } from "./provider";
import { DayAndPart, RequestData } from "./schema";
import { SolutionProviderMap, SolverLiveLayer } from "./solution";

// RPC Handler implementation using the SolutionAPI group
export const SolutionHandlersLive = SolutionAPI.toLayer({
  GetSolution: (payload) =>
    Effect.gen(function* () {
      const provider = yield* SolutionProvider;
      return yield* provider.solve();
    }).pipe(
      Effect.provide(
        SolutionProviderMap.get(
          new DayAndPart({
            day: payload.day,
            part: payload.part,
          }),
        ),
      ),
      Effect.provideService(RequestData, { body: payload.body }),
      Effect.provide(SolverLiveLayer),
      // Map internal errors to the RPC error type
      Effect.catchAll((error) =>
        Effect.fail(
          new RequestError({
            errorMessage:
              "_tag" in error ? `${error._tag}` : "Unknown error occurred",
          }),
        ),
      ),
    ),
});
