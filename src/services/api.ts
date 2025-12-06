import { Rpc, RpcGroup } from "@effect/rpc";
import { RequestError } from "./errors";
import { AnswerData, RequestData } from "./schema";

export class SolutionAPI extends RpcGroup.make(
  Rpc.make("GetSolution", {
    success: AnswerData,
    payload: RequestData,
    error: RequestError,
  }),
) {}
