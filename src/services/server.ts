import { Effect } from "effect";
import { SolutionAPI } from "./api";
import { RpcServer } from "@effect/rpc";
import { runSolution, SolutionProvider } from "./solution";

const SolutionAPILayer = SolutionAPI.toLayer({
  GetSolution: (request, ctx) =>
    Effect.gen(function* () {
      const provider = yield* SolutionProvider;
    }),
});
