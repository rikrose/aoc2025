"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer } from "effect";
import { GetSolutionPayload, SolutionAPI } from "@/services/api";
import type { AnswerData } from "@/services/schema";

// Create the protocol layer for the client
const ProtocolLive = RpcClient.layerProtocolHttp({
  url: "/api/rpc",
}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

// Typed function to get a solution via RPC
export const getSolution = (
  params: typeof GetSolutionPayload.Type,
): Promise<typeof AnswerData.Type> =>
  Effect.gen(function* () {
    const client = yield* RpcClient.make(SolutionAPI);
    return yield* client.GetSolution(params);
  }).pipe(Effect.scoped, Effect.provide(ProtocolLive), Effect.runPromise);
