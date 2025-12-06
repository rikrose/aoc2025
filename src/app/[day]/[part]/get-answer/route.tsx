import { Effect } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { routeHandler, SolverLiveLayer } from "@/services/solution";

export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/[day]/[part]/get-answer">,
) {
  const answer = await routeHandler({ body: req.body }, await ctx.params).pipe(
    Effect.provide(SolverLiveLayer),
    Effect.runPromise,
  );

  return new NextResponse(JSON.stringify(answer));
}
