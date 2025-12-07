import { HttpServer } from "@effect/platform";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { SolutionAPI } from "@/services/api";
import { SolutionHandlersLive } from "@/services/handlers";

// Create the web handler using RpcServer.toWebHandler
const { handler } = RpcServer.toWebHandler(SolutionAPI, {
  layer: Layer.mergeAll(
    SolutionHandlersLive,
    RpcSerialization.layerJson,
    HttpServer.layerContext,
  ),
});

// Export Next.js route handler
export const POST = (request: Request): Promise<Response> => handler(request);
