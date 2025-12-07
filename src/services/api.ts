import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";
import { RequestError } from "./errors";
import { AnswerData, Day, Part } from "./schema";

// RPC payload schema with inline definition for proper serialization
export class GetSolutionPayload extends Schema.Class<GetSolutionPayload>(
  "GetSolutionPayload",
)({
  day: Day,
  part: Part,
  body: Schema.NonEmptyArray(Schema.NonEmptyTrimmedString),
}) {}

export class SolutionAPI extends RpcGroup.make(
  Rpc.make("GetSolution", {
    success: AnswerData,
    payload: GetSolutionPayload,
    error: RequestError,
  }),
) {}
