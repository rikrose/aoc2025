import { Effect, Schema } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { RuntimeServer } from "@/services/runtime-server";
import { AnswerData, Day, Part, RequestData } from "@/services/schema";
import {
  type AvailableParts,
  type AvailableSolutions,
  runSolution,
} from "@/services/solution";

export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/[day]/[part]/get-answer">,
) {
  const { day: inputDay, part: inputPart } = await ctx.params;

  const program = Effect.gen(function* () {
    const day = Schema.decodeUnknownSync(Day)(inputDay);
    const part = Schema.decodeUnknownSync(Part)(inputPart);
    const inputData = yield* Schema.decodeUnknown(RequestData)(req.body);

    const answer = yield* runSolution(
      inputData,
      day as AvailableSolutions,
      part as AvailableParts,
    );

    return yield* Schema.encode(AnswerData)(answer);
  });

  const answer = await RuntimeServer.runPromise(program);

  return new NextResponse(JSON.stringify(answer));
}
