import { Context, Effect, identity, Layer } from "effect";
import { AnswerData, type RequestData } from "../schema";
import { SolutionProvider, type SolutionShape } from "../solution";

// biome-ignore lint/complexity/noBannedTypes: False positiive
export class Day1 extends Context.Tag("Day1")<Day1, {}>() {}

export const day1ProviderLayer = Layer.effect(
  SolutionProvider,
  Effect.gen(function* () {
    const part1 = Effect.fn("day1part1")(function* (input: RequestData) {
      const answer = input.data.reduce(
        (accumulator, current) => {
          const { pos, zeros } = accumulator;
          const offset =
            current.charAt(0) === "L"
              ? -Number(current.slice(1))
              : Number(current.slice(1));

          let answer = pos + (offset % 100);
          if (answer < 0) answer += 100;
          if (answer > 99) answer -= 100;

          return { pos: answer, zeros: zeros + (answer === 0 ? 1 : 0) };
        },
        { pos: 50, zeros: 0 },
      ).zeros;

      return new AnswerData({
        answer: answer.toString(),
      });
    });

    const part2 = Effect.fn("day1part2")(function* (input: RequestData) {
      const answer = input.data.reduce(
        (accumulator, current) => {
          let { pos, zeros } = accumulator;
          const offset =
            current.charAt(0) === "L"
              ? -Number(current.slice(1))
              : Number(current.slice(1));

          let answer = pos + offset;
          while (answer < 0) {
            answer += 100;
            zeros++;
          }
          while (answer > 99) {
            answer -= 100;
            zeros++;
          }

          return { pos: answer, zeros: zeros + (answer === 0 ? 1 : 0) };
        },
        { pos: 50, zeros: 0 },
      ).zeros;

      return new AnswerData({
        answer: answer.toString(),
      });
    });

    return identity<SolutionShape>({
      part1,
      part2,
    });
  }),
);
